#! /bin/bash 
 shopt -s nullglob dotglob 

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
options=($(echo $@ | tr " " "\n"))


IMAGES=(image_name) 
CONTAINER=(container_name)
VOLUME=(volumen_name)
SERVER='serverip'
BACKUPFOLDER=docker-backups


ChkFolder () {
    FILE=$SCRIPTPATH/$BACKUPFOLDER
    if [ -d "$FILE" ]; then
        #echo "1. ----EMPTY BACKUP FOLDER----"
        echo "1. ----BACKUP FOLDER FOUND----"
        # find $SCRIPTPATH/$BACKUPFOLDER -mindepth 1 -delete
    else 
        echo "1. ----CREATE BACKUP FOLDER----"
        mkdir $SCRIPTPATH/$BACKUPFOLDER
    fi
    echo ""
}

Help() {
    echo "-f for file backup"
    echo "-v for volume backup"
    echo "-i for image backup"
    echo "-r for restore backup"
    echo "-u for upload"
    echo "-d for download"
    echo ""
}

Action () {
    if [ $1 = '-v' ]; then
        echo "${2}.  ----CREATE VOLUME BACKUPS----" 
        declare -i img=0
        docker-compose up -d
       for i in  "${VOLUME[@]}"
            do
                vol=($(echo $i | tr "!" "\n"))
                container=${vol[0]}
                declare -i count=0
                for a in  "${vol[@]}"
                do
                    if [ $a != $container ]; then
                    type=($(echo $a | tr ":" "\n"))
                    volDr=${type[0]}
                    volDr=($(echo $volDr | sed "s/\//#/g"))
                    volTyp=vol
                    volDc=${type[1]}
                    volD=($(echo $volD:1| tr "." "\n"))
                    volD=${volD[0]}

                    if  [ "${volDr[0]:0:2}" == "./" ]; then
                      volDr=${volDr[0]:2}
                      volDr=($(echo $volDr | sed "s/[a-z|A-Z|0-9|\-]*\.\w*$//g"))
                      #volDr=${volDr[0]}
                      volTyp=mount
                    fi

                    if  [ "${volDr[0]:0:2}" == ".#" ]; then
                      volDr=${volDr[0]:2}
                      volDr=($(echo $volDr | sed "s/[a-z|A-Z|0-9|\-]*\.\w*$//g"))
                      #volDr=${volDr[0]}   
                      #volDr=($(echo $volDr| tr "." "\n"))        
                      volTyp=mount
                    fi

                    volD=($(echo $volDc | sed "s/.[a-z|A-Z|0-9|\-]*\.\w*$//g"))
                    volD=($(echo $volD | sed "s/\//-/g"))
                    echo ""
                 
                    saveTar=($(echo ${IMAGES[$img]} | sed "s/\//-/g"))
                    if  [ "$volTyp" == "mount" ]; then
                      #lokal volume
                   docker run --rm --volumes-from ${container} -v $SCRIPTPATH/$BACKUPFOLDER:/$BACKUPFOLDER ubuntu tar cvf /$BACKUPFOLDER/${count}_${volTyp}_${container}_${saveTar}_${volDr}_${volD:1}.tar $volDc
                    else
                    docker run --rm --volumes-from ${container} -v $SCRIPTPATH/$BACKUPFOLDER:/$BACKUPFOLDER ubuntu tar cvf /$BACKUPFOLDER/${count}_${volTyp}_${container}_${saveTar}_${volDr}_${volD:1}.tar $volDc
                    fi
                    fi
                    ((count=count +1))
                done
                ((img=img +1))
        done

                docker-compose down
    elif [ $1 = '-i' ]; then
            echo "${2}. ----CREATE IMAGES BACKUPS----"
            for i in  "${IMAGES[@]}"
            do 
            saveTar=($(echo $i | sed "s/\//-/g"))
            docker save ${i} > $SCRIPTPATH/$BACKUPFOLDER/save_${saveTar}.tar
            echo "${2}. ----image saved ${i}----"
            echo ""
            done
    elif [ $1 = '-f' ]; then
            echo "${2}. ----CREATE FILE BACKUPS----"
            FILE=$SCRIPTPATH/Dockerfile
        if test -f "$FILE"; then
            echo "copy $FILE"
            cp $FILE $SCRIPTPATH/$BACKUPFOLDER/Dockerfile
        fi
            FILE=$SCRIPTPATH/docker-compose.yml
        if test -f "$FILE"; then
            echo "copy $FILE"
            cp $FILE $SCRIPTPATH/$BACKUPFOLDER/docker-compose.yml
        fi
            FILE=$SCRIPTPATH/.dockerignore
        if test -f "$FILE"; then
            echo "copy $FILE"
            cp $FILE $SCRIPTPATH/$BACKUPFOLDER/.dockerignore
    fi
    elif [ $1 = '-r' ]; then
        echo "${2}. ----RESTORE BACKCUPS----"
        echo ""
        echo "${2}. ----RESTORE FILE BACKUPS----"
            FILE=$SCRIPTPATH/$BACKUPFOLDER/Dockerfile
        if test -f "$FILE"; then
            echo "copy $FILE"
            cp $FILE $SCRIPTPATH
        fi
            FILE=$SCRIPTPATH/$BACKUPFOLDER/docker-compose.yml
        if test -f "$FILE"; then
            echo "copy $FILE"
            cp $FILE $SCRIPTPATH
        fi
            FILE=$SCRIPTPATH/$BACKUPFOLDER/.dockerignore
        if test -f "$FILE"; then
            echo "copy $FILE"
            cp $FILE $SCRIPTPATH
        fi
        echo "${2}. ----RESTORE IMAGES BACKUPS----"
        for i in  "${IMAGES[@]}"
        do
            saveTar=($(echo $i | sed "s/\//-/g"))
            FILE=$SCRIPTPATH/$BACKUPFOLDER/save_${saveTar}.tar
            if test -f "$FILE"; then
            docker load -i $FILE
            echo "${2}. ----image loaded ${i}----"
            fi
        done

        echo ""
        echo "${2}. ----RESTORE MOUNTS----"
        mount_list=()
        while IFS= read -d $'\0' -r file ; do
            mount_list=("${mount_list[@]}" "$file")
        done < <(find ./$BACKUPFOLDER -regex ".*mount.*\.\(tar\)" -print0)
        echo ""

        vol_list=()
        while IFS= read -d $'\0' -r file ; do
            vol_list=("${vol_list[@]}" "$file")
        done < <(find ./$BACKUPFOLDER -regex ".*vol.*\.\(tar\)" -print0)

        for file in  "${mount_list[@]}"
            do
            fileArr=($(echo $file | tr "_" "\n"))
            testLen=${#fileArr[@]}
     
            if [[ "${testLen}" == "5" ]]; then
              mountFolder=./
              filePath=($(echo ${fileArr[4]} | sed "s/-/\//g"))
            else
              mountFolder=${fileArr[4]}
              filePath=($(echo ${fileArr[5]} | sed "s/-/\//g"))
            fi

            mountFolder=($(echo $mountFolder| sed "s/#/\//g"))
            filePath=($(echo $filePath | sed "s/\.tar//"))
            depthArr=($(echo $filePath | tr "/" "\n"))
            depth=${#depthArr[@]}
            continerName=${fileArr[2]}


            FILE=$SCRIPTPATH/$mountFolder
            if [ -d "$FILE" ]; then
                #echo "1. ----EMPTY BACKUP FOLDER----"
                echo "1. ----MOUNT FOLDER FOUND----"
                # find $SCRIPTPATH/$BACKUPFOLDER -mindepth 1 -delete
            else 
                mkdir $SCRIPTPATH/$mountFolder
            fi
            tar -C $SCRIPTPATH/$mountFolder --strip-components=$depth  -xvf $SCRIPTPATH/$file $filePath 
            #mv ./$BACKUPFOLDER/etc ./moved/etc
        done

        echo "${2}. ----RESTORE VOLUMES----"
        docker-compose up -d
        for file in  "${vol_list[@]}"
            do
            fileArr=($(echo $file | tr "_" "\n"))
            filePath=($(echo ${fileArr[5]} | sed "s/-/\//g"))
            filePath=($(echo $filePath | sed "s/\.tar//"))
            mountFolder=($(echo $filePath | tr "/" "\n"))
            mountFolder=${mountFolder[0]}
            depthArr=($(echo $filePath | tr "/" "\n"))
            depth=${#depthArr[@]}
            continerName=${fileArr[2]}

   
            FILE=$SCRIPTPATH/$BACKUPFOLDER/$mountFolder
            if [ -d "$FILE" ]; then
                    echo "1. ----MOUNT FOLDER FOUND----"
            else 
                    mkdir $SCRIPTPATH/$BACKUPFOLDER/$mountFolder
            fi
            tar -C $SCRIPTPATH/$BACKUPFOLDER/ -xvf $SCRIPTPATH/$file 
            docker cp $SCRIPTPATH/$BACKUPFOLDER/$mountFolder $continerName:/
            rm -r $SCRIPTPATH/$BACKUPFOLDER/$mountFolder
            #mv ./$BACKUPFOLDER/etc ./moved/etc
        done

        docker-compose down
        echo ""

    elif [ $1 = '-u' ]; then
        echo "${2}. ----UPLOAD BACKCUPS----"
        rsync -r -P $SCRIPTPATH/$BACKUPFOLDER $SERVER
    elif [ $1 = '-d' ]; then
        echo "${2}. ----DOWNLOAD BACKCUPS----"
        rsync -r -P $SERVER/$BACKUPFOLDER  $SCRIPTPATH
    else 
        Help
        exit
    fi
}

if [ $1 == '--help' ]; then
    Help
else
    countOpt=${#options[@]}
    if [$countOpt < 1]; then
     Help
     exit
    fi
    clear 
    echo "BACKUP $SCRIPTPATH"
    echo ""
    ChkFolder
    declare -i step=2
    for o in  "${options[@]}"
        do 
        Action $o $step
        echo ""
        ((step=step +1))
    done
    echo "$step. ---- DONE ----"  
    echo ""
    echo "DOWNLOAD: $SCRIPTPATH/$BACKUPFOLDER/"  
    echo ""
fi
exit