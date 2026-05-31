import { StyleSheet, Text, View } from "react-native";

export function PlaceholderAR() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>Exposição AR</Text>
        <Text style={styles.title}>Visualização em AR indisponível na web</Text>
        <Text style={styles.description}>
          Essa tela foi substituída por um placeholder no navegador porque a
          experiência com Viro não roda no ambiente web.
        </Text>
        <Text style={styles.hint}>
          Abra este fluxo em um dispositivo compatível para usar a versão AR.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 560,
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 28,
    backgroundColor: "rgba(15, 23, 42, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.2)",
  },
  badge: {
    alignSelf: "flex-start",
    marginBottom: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(56, 189, 248, 0.16)",
    color: "#7DD3FC",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    marginBottom: 16,
  },
  description: {
    color: "#CBD5E1",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 12,
  },
  hint: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22,
  },
});