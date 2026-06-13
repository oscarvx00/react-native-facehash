import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Facehash,
  FacehashProvider,
} from "react-native-facehash";

const BRAND_COLORS = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
const PASTEL_COLORS = ["#ffd6e0", "#ffefcf", "#c8f0d4", "#c3d9ff", "#e8d5ff"];

const USERS = ["alice", "bob", "charlie", "diana", "eve"];

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* Without provider — all defaults */}
      <Section label="Without provider (defaults)">
        <Row>
          {USERS.map((u) => (
            <Facehash key={u} name={u} size={56} />
          ))}
        </Row>
      </Section>

      {/* Provider sets brand colors and square shape for all children */}
      <Section label="FacehashProvider — brand colors + square">
        <FacehashProvider colors={BRAND_COLORS} shape="square" size={56}>
          <Row>
            {USERS.map((u) => (
              <Facehash key={u} name={u} />
            ))}
          </Row>
        </FacehashProvider>
      </Section>

      {/* Provider with pastel palette and solid variant */}
      <Section label="FacehashProvider — pastel + solid variant">
        <FacehashProvider
          colors={PASTEL_COLORS}
          variant="solid"
          size={56}
          faceColor="#333"
        >
          <Row>
            {USERS.map((u) => (
              <Facehash key={u} name={u} />
            ))}
          </Row>
        </FacehashProvider>
      </Section>

      {/* Instance prop overrides the provider */}
      <Section label="Per-instance override inside provider">
        <FacehashProvider colors={BRAND_COLORS} size={56} shape="circle">
          <Row>
            <Facehash name="alice" />
            <Facehash name="bob" />
            {/* This one overrides size and shape */}
            <Facehash name="charlie" size={80} shape="square" />
            <Facehash name="diana" />
          </Row>
        </FacehashProvider>
      </Section>

      {/* Avatar with provider */}
      <Section label="Avatar inside FacehashProvider">
        <FacehashProvider colors={BRAND_COLORS} size={64} shape="circle">
          <Row>
            <Avatar style={{ width: 64, height: 64 }}>
              <AvatarImage source="https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg?size=626&ext=jpg" />
              <AvatarFallback name="John Doe" />
            </Avatar>
            <Avatar style={{ width: 64, height: 64 }}>
              {/* Forces fallback */}
              <AvatarImage source="" />
              <AvatarFallback name="Jane Smith" />
            </Avatar>
          </Row>
        </FacehashProvider>
      </Section>
    </ScrollView>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    gap: 32,
  },
  section: {
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
});
