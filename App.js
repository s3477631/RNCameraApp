import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Circle, Svg, Symbol, Use} from 'react-native-svg'
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { Video } from 'expo-av';
import * as Sharing from 'expo-sharing';
export default function App() {
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [hasPermission, setHaspermission] = useState(null);
    const [progress, setProgressBar] = useState(0)
    const [run, setRun] = useState(false);
    const [timerRun, setTimerRun] = useState(null);
    const [previewUri, setPreviewUri] = useState(undefined)
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        (async () => {
            const {status, permissions} = await Permissions.askAsync(Permissions.CAMERA);
            if (status === 'granted') {
                const {status, permissions} = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
                if (status === 'granted') {
                    setHaspermission(status === 'granted');
                }
            }
        })();
    }, []);


    if (hasPermission === null) {
        return <View/>
    }
    if (hasPermission === false) {
        return <Text> Access Denied! </Text>
    }
    const SVGHeight = 150
    const SVGWidth = 150
    const graphHeight = 150


    const runPress = () => {
        // if( run === false){
        //     snap()
        //     setRun(true)
        // }
        // else{
        //     stop()
        // }

        if (run === false) {

            let count = 0
            let timer = setInterval(() => {
                if (count < 100) {
                    setProgressBar(count++)
                    setRun(true)
                }
                else{
                    setRun(false)
                    stop()
                }
            }, 200)
            setTimerRun(timer)
            if(setRun === false){
                console.log('not running dick')
            }
            else{
                snap()
                console.log('running dick')
            }


        } else {
            setProgressBar(0);
            setRun(false)
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        backgroundVideo: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
    });

    const snap = async () => {
        if (this.camera) {
            let photo = await this.camera.recordAsync();
            console.log(photo.uri)
            setPreviewUri(photo.uri)
        }
    }

    const stop = () => {
        if (this.camera) {
            this.camera.stopRecording()
            setDisplay(true)
        }
    }

    if (display) {
        return (<SafeAreaView style={{flex: 1}}>
                <Video source={{uri: previewUri}}
                       rate={1.0}
                       volume={1.0}
                       isMuted={false}
                       resizeMode="cover"
                       shouldPlay
                       style={styles.backgroundVideo}/>
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <Camera
                maxDuration={100}
                style={{flex: 1}}
                type={type}
                ref={ref => {
                    this.camera = ref;
                }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column-reverse',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={runPress}>
                        <Svg height="150" width="200">
                            <Symbol id="symbol" viewBox="0 0 200 100" width="200" height="200">
                                <Circle cx="50" cy="50" r="35" strokeWidth="0" stroke="red" fill="red"/>
                                <AnimatedCircularProgress
                                    size={100}
                                    width={5}
                                    fill={100}
                                    tintColor="#00e0ff"
                                    backgroundColor="#fff"/>
                                <View style={[{
                                    transform: [{rotate: "30deg"}, {translateX: 0}, {translateY: 0}]
                                }]}>
                                    <AnimatedCircularProgress
                                        style={[{
                                            transform: [{rotate: "270deg"}, {translateX: 50}, {translateY: -50}]
                                        }]}
                                        size={100}
                                        width={6}
                                        fill={progress}
                                        tintColor="#fff"
                                        backgroundColor="red"/>
                                </View>
                            </Symbol>
                            <Use href="#symbol" x="50" y="-10" width="200" height="200"/>
                        </Svg>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 320,
                            height: 150,
                            marginBottom: -30,
                            backgroundColor: '#92959b',
                            opacity: .7,
                            borderRadius: 10,
                            borderWidth: 5,
                            borderColor: 'black'
                        }}>
                        <Text style={{fontSize: 25, color: 'white', fontWeight: "500", textAlign: "center"}}>Give it a
                            go!</Text>
                        <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
                            Sawubona unjani namhlanje? Ngiyawuthanda umbala wamehlo akho!</Text>
                    </View>
                </View>
            </Camera>
        </SafeAreaView>
    )
}



