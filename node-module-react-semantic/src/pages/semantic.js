import React from 'react';
import {Button, Card, Icon, Image} from 'semantic-ui-react';

export default function Semantic(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  return (
    <React.Fragment>
      <main style={{maxWidth: '900px', margin: 'auto'}}>
        <div>
          <Button primary>Primary</Button>
          <Button secondary>Secondary</Button>
        </div>
        <Card>
          <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </main>
    </React.Fragment>
  );
}
