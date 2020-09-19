import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Tabs, Badge, TabBar, ListView } from 'antd-mobile';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  BellOutlined,
  PlusCircleFilled,
  MessageOutlined,
  UserOutlined,
  HeartOutlined,
  CommentOutlined,
  BookOutlined,
  SmileOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import Bee from '../assets/bee.svg';
import Games from '../assets/games.jpg';
import Sneaker from '../assets/sneaker.jpg';
import Sushi from '../assets/sushi.jpg';

const NavigationBar = () => {
  return (
    <div>
      <NavBar
        mode="light"
        icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <SearchOutlined
            key={0}
            style={{ fontSize: '20px', marginRight: '12px' }}
          />,
          <EnvironmentOutlined key={1} style={{ fontSize: '20px' }} />,
        ]}
        style={{ borderBottom: '1px solid #fafafa' }}
      >
        <img style={{ height: '18px' }} src={Bee} alt="bizbee" />
        &nbsp;
        <h5>bizbee</h5>
      </NavBar>
      <CategoriesTab />
    </div>
  );
};

const tabs = [
  { title: <Badge>All</Badge> },
  { title: <Badge>Food</Badge> },
  { title: <Badge>Clothing</Badge> },
  { title: <Badge>Electronics</Badge> },
  { title: <Badge>Services</Badge> },
  { title: <Badge>Rentals</Badge> },
  { title: <Badge>Vehicles</Badge> },
];

const CategoriesTab = () => {
  return (
    <Tabs
      tabBarTextStyle={{ fontSize: '14px', height: '32px' }}
      tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => {
        console.log('onChange', index, tab);
      }}
      onTabClick={(tab, index) => {
        console.log('onTabClick', index, tab);
      }}
    />
  );
};

const data = [
  {
    img: Games,
    name: 'Biboy Pascual',
    location: '107 Lugam, Malolos, Bulacan',
    description: 'PS4 Games For Sale!',
    price: '9,500',
  },
  {
    img: Sneaker,
    name: 'Sneaker-Verse',
    location: 'San Fernando, Pampanga',
    description: 'Air Force 1',
    price: '5,000',
  },
  {
    img: Sushi,
    name: 'Miyagi-Do Sushi',
    location: 'Malolos, Bulacan',
    description: 'Sushi On Hand!!!',
    price: '500',
  },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

class ListViewExample extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4,
    };
  }

  componentDidMount() {
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    setTimeout(() => {
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}>
          <div
            style={{
              padding: '16px 8px 8px 8px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <SmileOutlined style={{ fontSize: '35px', marginRight: '8px' }} />
            <div>
              <span
                style={{
                  color: '#333',
                  fontWeight: 'bold',
                }}
              >
                {obj.name}
              </span>
              <br />
              <span
                style={{
                  color: '#949494',
                  fontSize: '12px',
                }}
              >
                {obj.location}
              </span>
            </div>
            <span
              style={{
                fontSize: '20px',
                marginTop: '-8px',
                marginLeft: 'auto',
              }}
            >
              <EllipsisOutlined />
            </span>
          </div>
          <div style={{ display: 'flex' }}>
            <img style={{ width: '100%' }} src={obj.img} alt="" />
          </div>
          <div
            style={{
              padding: '8px',
              fontSize: '20px',
            }}
          >
            <span style={{ marginRight: '12px' }}>
              <HeartOutlined />
            </span>
            <span>
              <CommentOutlined />
            </span>
            <span style={{ float: 'right' }}>
              <BookOutlined />
            </span>
          </div>
          <div
            style={{
              fontWeight: 'bold',
              padding: '0 8px 8px 8px',
            }}
          >
            {obj.description} - PHP {obj.price}
          </div>
        </div>
      );
    };

    return (
      <ListView
        ref={(el) => (this.lv = el)}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>
        )}
        // renderSectionHeader={(sectionData) => (
        //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        // )}
        renderRow={row}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => {
          console.log('scroll');
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ paddingTop: 60 }}>{pageText} Tab</div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#333"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            icon={<HomeOutlined style={{ fontSize: '20px' }} />}
            selectedIcon={<HomeOutlined style={{ fontSize: '20px' }} />}
            title="Home"
            key="Home"
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <NavigationBar />
            <ListViewExample />
          </TabBar.Item>
          <TabBar.Item
            icon={<BellOutlined style={{ fontSize: '20px' }} />}
            selectedIcon={<BellOutlined style={{ fontSize: '20px' }} />}
            title="Activity"
            key="Activity"
            dot
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            <NavigationBar />
            {this.renderContent('Activity')}
          </TabBar.Item>
          <TabBar.Item
            icon={<PlusCircleFilled style={{ fontSize: '25px' }} />}
            selectedIcon={<PlusCircleFilled style={{ fontSize: '25px' }} />}
            key="Add"
            selected={this.state.selectedTab === 'grayTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'grayTab',
              });
            }}
          >
            <NavigationBar />
            {this.renderContent('Add')}
          </TabBar.Item>
          <TabBar.Item
            icon={<MessageOutlined style={{ fontSize: '20px' }} />}
            selectedIcon={<MessageOutlined style={{ fontSize: '20px' }} />}
            title="Messages"
            key="Messages"
            badge={1}
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            <NavigationBar />
            {this.renderContent('Messages')}
          </TabBar.Item>
          <TabBar.Item
            icon={<UserOutlined style={{ fontSize: '20px' }} />}
            selectedIcon={<UserOutlined style={{ fontSize: '20px' }} />}
            title="Profile"
            key="Profile"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            <NavigationBar />
            {this.renderContent('Profile')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default HomePage;
