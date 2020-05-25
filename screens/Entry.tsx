import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useTheme, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";
import { sg, Text } from "../styleguide";

type Props = {
  navigation: NavigationProp<any>;
  route: {
    params: Entry;
  };
};

type Entry = {
  createdAt?: Date;
  title?: string;
  body?: string;
  images: {
    cancelled: boolean;
    height?: number;
    type?: string;
    uri?: string;
    width?: number;
  }[];
};

export function Entry(props: Props) {
  const { navigation, route } = props;
  const { createdAt = new Date().getTime() } = route?.params ?? {};
  const theme: any = useTheme();
  const { colors } = theme;

  const [entryImages, setEntryImages] = useState(route?.params?.images ?? []);
  const [entryTitle, setEntryTitle] = useState(route?.params?.title);
  const [entryBody, setEntryBody] = useState(route?.params?.body);

  useEffect(function updateStatusBar() {
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("light-content", true);
      return () =>
        StatusBar.setBarStyle(
          theme.dark ? "light-content" : "dark-content",
          true
        );
    }
  });

  async function onDonePress() {
    const entry = {
      createdAt,
      title: entryTitle,
      body: entryBody,
      images: entryImages,
    };

    try {
      const jsonValue = JSON.stringify(entry);
      await AsyncStorage.setItem(
        `@grayOne/entries/${entry.createdAt}`,
        jsonValue
      );
    } catch (e) {
      alert("There was an error saving your entry: " + e);
    }

    navigation.goBack();
  }

  async function selectImageAsync() {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    setEntryImages([pickerResult, ...entryImages]);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <View
        style={[
          styles.contentContainer,
          sg.displayHorizontal,
          { justifyContent: "space-between" },
        ]}
      >
        <Text fontFamily="SansBold" fontSize={16}>
          {format(createdAt, "E, MMM dd, yyyy")}
        </Text>
        <TouchableOpacity onPress={onDonePress} style={styles.doneButton}>
          <Text fontFamily="SansBold" fontSize={16}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.contentArea,
          {
            backgroundColor: colors.background,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.photoContainer,
            styles.contentContainer,
          ]}
        >
          {entryImages &&
            entryImages.map((entryImage) => (
              <Image
                style={styles.entryImage}
                key={entryImage.uri}
                source={{ uri: entryImage.uri }}
              />
            ))}
          <TouchableOpacity
            onPress={selectImageAsync}
            style={[
              styles.addPhoto,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <Text>Add photo</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Entry title"
            returnKeyType="next"
            defaultValue={entryTitle}
            onChangeText={(text) => setEntryTitle(text)}
            multiline
            // TODO: only autofocus if there's an entry
            // TODO: onSubmitEditing, focus the next textinput
            autoFocus={entryTitle !== undefined}
          />
          <TextInput
            style={styles.bodyInput}
            placeholder="A wonderful new entry..."
            multiline
            defaultValue={entryBody}
            onChangeText={(text) => setEntryBody(text)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  doneButton: {
    padding: 8,
  },
  contentArea: {
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  titleInput: {
    fontSize: 24,
    fontFamily: "SerifBold",
    lineHeight: 29,
  },
  bodyInput: {
    fontSize: 18,
    fontFamily: "SerifBook",
    lineHeight: 22,
    height: 1000,
  },
  photoContainer: {
    flexDirection: "row",
  },
  addPhoto: {
    height: 156,
    width: 156,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  entryImage: {
    height: 156,
    width: 156,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    resizeMode: "cover",
    marginRight: 16,
  },
});
