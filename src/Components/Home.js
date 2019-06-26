//import liraries
import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Dimensions, Alert, Text, Image } from 'react-native';
import { Card,Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Colors from './Colors'
import FAIcon from 'react-native-vector-icons/FontAwesome';
const { WIDTH } = Dimensions.get('window')

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPostItem({ item }) {
    return (
      <Card
      containerStyle={{marginHorizontal:4,elevation:4}}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            size={35}
            containerStyle={{ marginRight: 8 }}
            rounded
            source={{ uri: item.author.imageUrl }}
          />
          <Text style={styles.authorimg}>{item.author.name}</Text>
        </View>
        <View style={{ flexDirection: 'column' ,marginTop:8}}>
          <Text style={styles.posttxt}>{item.title}</Text>
          <Image
            style={{ with: WIDTH, height: 200, backgroundColor: '#f89', }}
            source={{ uri: item.url }}
          />

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop:8}}>

          <View style={{  flexDirection: 'column',alignItems:'center'}}>
          <Text>0 Likes</Text>
          <FAIcon
            name='thumbs-up'
            size={28}
            color={Colors.grat}
          />
            
          </View>

          <View style={{  flexDirection: 'column',alignItems:'center'}}>
          <Text>0 Comments</Text>
          <FAIcon
            name='comment'
            size={25}
            color={Colors.grat}
          />
            
          </View>

          <View style={{  flexDirection: 'column',alignItems:'center'}}>
          <Text>0 Shares</Text>
          <FAIcon
            name='share'
            size={25}
            color={Colors.grat}
          />
            
          </View>
        </View>
        {/* <ListItem
          title={item.author.name}
          avatar={{ uri: item.author.imageUrl }}
          roundAvatar
        />

        <Text>{item.author.imageUrl}</Text> */}

      </Card>
    );
  }

  keyExtractor = (item, index) => index;

  showSpinerOrPosts() {
    if (this.props.fetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={Colors.blue} />
        </View>
      );
    }
    let num = this.props.data.length
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderPostItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.showSpinerOrPosts()}
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorimg:{
    color:'#000',
    fontSize:18
  },
  posttxt:{
    color:'#000',
    marginBottom:5
  }
});

const mapStateToProps = state => {
  return {
    fetching: state.post.fetching,
    data: state.post.data
  };
};

//make this component available to the app
export default connect(mapStateToProps, { fetchPosts })(Home);
