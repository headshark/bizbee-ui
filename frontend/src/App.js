import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

const App = () => {
  return (
    <div className="App">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >
        bizbee
      </NavBar>
    </div>
  );
};

export default App;
