import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";

const { height } = Dimensions.get("window");

// TODO:
// 1. use safe area context in here
// 2. use reanimated

class HeaderScrollView extends Component<any> {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    headlineStyle: PropTypes.object,
    children: PropTypes.node,
    containerStyle: PropTypes.object,
    headerContainerStyle: PropTypes.object,
    headerComponentContainerStyle: PropTypes.object,
    scrollContainerStyle: PropTypes.object,
    fadeDirection: PropTypes.string,
    scrollViewProps: PropTypes.object,
  };

  static defaultProps = {
    scrollViewProps: {},
  };

  state = {
    headerHeight: 0,
    headerY: 0,
    isHeaderScrolled: false,
    fadeDirection: "",
  };

  onLayout = (event) => {
    this.setState({
      headerHeight: event.nativeEvent.layout.height,
      headerY: event.nativeEvent.layout.y,
    });
  };

  scrollAnimatedValue = new Animated.Value(0);

  handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = this.state.headerHeight + this.state.headerY - 8;
    const isHeaderScrolled = scrollHeaderOffset < offset;

    if (!this.state.isHeaderScrolled && isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }

    if (this.state.isHeaderScrolled && !isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }
  };

  render() {
    const {
      children,
      title = "",
      titleStyle = {},
      containerStyle = {},
      headerContainerStyle = {},
      headerComponentContainerStyle = {},
      headlineStyle = {},
      scrollContainerStyle = {},
      fadeDirection,
      scrollViewProps = {},
    } = this.props;

    const fontSize = titleStyle.fontSize || 34;
    const titleStyles = {
      fontSize,
      lineHeight: fontSize * 1.2,
    };

    const animatedFontSize = this.scrollAnimatedValue.interpolate({
      inputRange: [-height, 0],
      outputRange: [fontSize * 1.75, fontSize],
      extrapolate: "clamp",
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          <View
            style={[
              styles.headerComponentContainer,
              headerComponentContainerStyle,
              {
                // TODO: Fade this in
                opacity: this.state.isHeaderScrolled ? 1 : 0,
              },
            ]}
          >
            <Text style={[styles.headline, headlineStyle]}>{title}</Text>
          </View>
        </View>
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } },
              },
            ],
            {
              listener: this.handleScroll,
            }
          )}
          scrollEventThrottle={8}
          contentContainerStyle={scrollContainerStyle}
          {...scrollViewProps}
        >
          <View>
            <Animated.Text
              style={[
                styles.title,
                titleStyle,
                titleStyles,
                {
                  fontSize: animatedFontSize,
                },
              ]}
              onLayout={this.onLayout}
            >
              {title}
            </Animated.Text>
          </View>
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default HeaderScrollView;

// import { ifIphoneX } from 'react-native-iphone-x-helper';

// const headerHeight = ifIphoneX(88, 60);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  headerContainer: {
    // TODO: This height is wrong
    height: 88,
  },
  headerComponentContainer: {
    height: 88,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "500",
    letterSpacing: 0.019,
  },
  title: {
    letterSpacing: 0.011,
    fontWeight: "700",
    marginLeft: 16,
  },
});
