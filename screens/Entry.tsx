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
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTheme, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";
import { Entry as EntryType } from "../common/types";
import { deleteEntry } from "../common/storage";
import { sg, Text } from "../styleguide";
import { CameraIcon, MoreIcon } from "../components/Icons";

type Props = {
  navigation: NavigationProp<any>;
  route: {
    params: EntryType;
  };
};

export function Entry(props: Props) {
  const { navigation, route } = props;
  const { createdAt = new Date().getTime() } = route?.params ?? {};
  const theme: any = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const { colors } = theme;

  const [entryImages, setEntryImages] = useState(route?.params?.images ?? []);
  const [entryTitle, setEntryTitle] = useState(route?.params?.title);
  const [entryBody, setEntryBody] = useState(route?.params?.body);

  function openActionSheet() {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          await deleteEntry(createdAt);

          navigation.goBack();
        }
      }
    );
  }

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

    const oneFieldPresent =
      entry.title !== undefined ||
      entry.body !== undefined ||
      entry.images.length;

    if (oneFieldPresent) {
      try {
        const jsonValue = JSON.stringify(entry);
        await AsyncStorage.setItem(
          `@grayOne/entries/${entry.createdAt}`,
          jsonValue
        );
      } catch (e) {
        alert("There was an error saving your entry: " + e);
      }
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
        <View style={sg.displayHorizontal}>
          <TouchableOpacity
            onPress={() => openActionSheet()}
            style={styles.moreButton}
          >
            <MoreIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDonePress} style={styles.doneButton}>
            <Text fontFamily="SansBold" fontSize={16}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.contentArea,
          {
            backgroundColor: colors.background,
            flex: 1,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <View style={{ flex: 0 }}>
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
                { backgroundColor: colors.backgroundTertiary },
              ]}
            >
              <View style={{ opacity: 0.5 }}>
                <CameraIcon />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={[styles.contentContainer, { flex: 1 }]}>
          <TextInput
            style={[styles.titleInput, { color: colors.text }]}
            placeholderTextColor={colors.placeholderText}
            placeholder="Entry title"
            returnKeyType="next"
            defaultValue={entryTitle}
            onChangeText={(text) => setEntryTitle(text)}
            multiline
            // TODO: onSubmitEditing, focus the next textinput
            autoFocus={entryTitle === undefined}
          />
          <TextInput
            style={[styles.bodyInput, { color: colors.text }]}
            placeholder="A wonderful new entry..."
            placeholderTextColor={colors.placeholderText}
            multiline
            defaultValue={entryBody}
            onChangeText={(text) => setEntryBody(text)}
          />
        </View>
      </ScrollView>
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
  moreButton: {
    padding: 8,
    marginRight: 8,
  },
  contentArea: {
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  titleInput: {
    fontSize: 28,
    fontFamily: "SerifBold",
    lineHeight: 29,
  },
  bodyInput: {
    fontSize: 20,
    fontFamily: "SerifBook",
    lineHeight: 22,
    flex: 1,
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
