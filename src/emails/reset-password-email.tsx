import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({ name, resetUrl }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your SmartCook AI password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>SmartCook AI</Heading>
          <Section style={card}>
            <Text style={greeting}>Hi {name},</Text>
            <Text style={paragraph}>
              We received a request to reset your password. Click the button
              below to choose a new one.
            </Text>
            <Button href={resetUrl} style={button}>
              Reset Password
            </Button>
            <Text style={hint}>
              This link expires in 1 hour. If you didn&apos;t request a password
              reset, you can safely ignore this email.
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>SmartCook AI · Eat smarter, cook better</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: "#f6f6f6",
  fontFamily: "-apple-system, sans-serif",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#FF6900",
  textAlign: "center",
  margin: "0 0 24px",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px",
};

const greeting: React.CSSProperties = {
  fontSize: "16px",
  color: "#0a0a0a",
  margin: "0 0 12px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  color: "#4a5565",
  lineHeight: "1.6",
  margin: "0 0 28px",
};

const button: React.CSSProperties = {
  backgroundColor: "#FF6900",
  borderRadius: "6px",
  color: "#ffffff",
  display: "block",
  fontSize: "15px",
  fontWeight: "600",
  padding: "12px 24px",
  textAlign: "center",
  textDecoration: "none",
};

const hint: React.CSSProperties = {
  fontSize: "13px",
  color: "#717182",
  marginTop: "24px",
  lineHeight: "1.5",
};

const hr: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#717182",
  textAlign: "center",
};
