import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

type Props = {};

export function Home(props: Props) {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text style={{ color: colors.text }}>Entries Screen</Text>
      <Text style={{ color: colors.text, fontSize: 32 }}>
        The evolution of a process is directed by a pattern of rules called a
        program. People create programs to direct processes. In effect, we
        conjure the spirits of the computer with our spells. A computational
        process is indeed much like a sorcerer’s idea of a spirit. It cannot be
        seen or touched. It is not composed of master at all. However, it is
        very real. It can perform intellectual work. It can answer questions. It
        can affect the world by disbursing money at a bank or by controlling a
        robot arm in a factory. The programs we use to conjure processes are
        like a sorcerer’s spells. They are carefully composed from symbolic
        expressions in arcane and esoteric programming languages that prescribe
        the tasks we want our processes to perform. A computational process, in
        a correctly working computer, executes programs precisely and
        accurately. Thus, like the sorcerer’s apprentice, novice programmers
        must learn to understand and to anticipate the consequences of their
        conjuring. Even small errors (usually called bugs or glitches) in
        programs can have complex and unanticipated consequences.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
});
