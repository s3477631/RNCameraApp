import * as React from 'react';
import {View} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import {StyleSheet} from "react-native";


export const ButtonRound = () => (
    <Svg height="20%" width="100%" viewBox="0 0 100 100">
        <Circle
            cx="50"
            cy="50"
            r="50"
            stroke="red"
            strokeWidth="3"
            fill="green"
        />
        </Svg>
);

const styles = StyleSheet.create({
        container: {
                position: "relative"
        }

        })

