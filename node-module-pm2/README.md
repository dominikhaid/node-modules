
# Pm2 Node Manager / Cluster

<br/><br/>

## Discription

---

This module is developed to extend our base server. It can be easily installed with the Plugin script from the base module. For detailed Information please see [@base-server](https://github.com/dominikhaid/node-base-server.git)

### Module Features

- Add Pm2 to base package
- Example configuration


### Setup

---

> git clone https://github.com/dominikhaid/node-base-server.git my-app
> 
> cd my-app
> 
> npm run plugin p=https://github.com/dominikhaid/node-module-pm2.git
> 
> edit the ecosystem.config.js
> 
> pm2 start

<br/><br/>

## PM2 Commands

### Fork mode

---

```
pm2 start app.js --name my-api # Name process
```

### Cluster mode

---

```
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total
```

### Listing

---

```
pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes
```

### Logs

---

```
pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs
```

### Actions

---

```
pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list
```

### Misc

---

```
pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
pm2 start echo.sh
```
