import AsyncStorage from "@react-native-community/async-storage";

export const getAllEntries = async () => {
  // AsyncStorage.clear();
  let keys: string[] = [];
  try {
    const foundKeys = await AsyncStorage.getAllKeys();

    foundKeys.forEach((foundKey) => {
      if (foundKey.match("@grayOne/entries")) {
        keys.push(foundKey);
      }
    });
  } catch (e) {
    console.error(e);
  }

  let entries;

  try {
    entries = await AsyncStorage.multiGet(keys);
    const formattedEntries = entries
      .map((entry) => {
        try {
          return JSON.parse(entry[1] ?? "");
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);

    return formattedEntries;
  } catch (e) {
    console.error(e);
  }
};

export const deleteEntry = async (createdAt: number) => {
  try {
    await AsyncStorage.removeItem(`@grayOne/entries/${createdAt}`);
  } catch (e) {
    console.error(e);
  }
};
