import React, { Component } from 'react'
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { Avatar, Button, Input } from 'react-native-elements'
import { Card, CardSection, Spinner } from '../comon'
import ImagePicker from 'react-native-image-picker';
import imgsrc from '../add-icon.png'
import { connect } from 'react-redux'
import {addPost} from '../actions'
const { WIDTH } = Dimensions.get('window')
class AddPost extends Component {
    constructor(props) {
        super(props);

        this.state = { error: '',  imgUri: '',title:'',imageName: '' }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.added) {
            this.props.navigation.goBack();
        }
    }

    renderErrorMessage = () => {
        if (this.props.error) {
            return (
                <Text style={{ color: 'red', fontSize: 16 ,textAlign:'center'}}>{this.props.error}</Text>
            )
        }

    }

    onShareButtonPressed=()=> {
        const { imgUri, imageName, title } = this.state;
        const { profile } = this.props;
        this.props.addPost(title, profile, imgUri, imageName);
    }



    SelectAvatar = () => {
        const options = {
            title: 'Select Avatar',
            quality: 0.1,
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            const imageName = `${this.props.profile.id}-${response.fileName}`;
            this.setState({
            imgUri: response.uri,
            imageName: imageName
            })
            // console.log(imageName);
        })
    }

    render() {
        return (
            <Card>

                <CardSection>
                    <View style={{ flex: 1 }}>
                        <Input
                            multiline
                            placeholder='Post Description'
                            underlineColorAndroid='transparent'
                            style={{
                                multiline: true,
                                numberOfLines: 4
                            }}
                            onChangeText={text => this.setState({ title: text })}
                        />

                        <TouchableOpacity activeOpacity={.5} onPress={this.SelectAvatar}>
                            <Image

                                style={{ backgroundColor: '#ddd', marginTop: 8, width: WIDTH, height: 200 }}
                                containerStyle={{ marginVertical: 8 }}
                                icon={{ name: 'plus-circle', type: 'font-awesome', size: 50 }}
                                onPress={this.SelectAvatar}
                                resizeMode='center'
                                source={this.state.imgUri ? { uri: this.state.imgUri } : imgsrc}

                            />
                        </TouchableOpacity>
                    </View>
                </CardSection>
                
                {this.renderErrorMessage()}
                <CardSection>
                    <View style={{ flex: 1 }}>
                        <Button title="Post"
                            onPress={this.onShareButtonPressed}
                            loading={this.props.loading}
                            disabled={!this.state.imgUri}
                        />
                    </View>
                </CardSection>

            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.auth.profile,
        loading: state.post.loading,
        error: state.post.error,
        added: state.post.added
    };
};
export default connect(mapStateToProps,{addPost})(AddPost)