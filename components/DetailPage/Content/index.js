import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Row, Col, Breadcrumb, Spin, Typography } from "antd";
import { FormattedLink } from "../../FormattedLink/";
import styles from "./index.module.css";

const { Title, Paragraph } = Typography;

export default function Content({
  swc: {
    id,
    content: {
      Title: title,
      Description: description,
      Relationships: relationships,
      Remediation: remediation,
    },
  },
  transferring,
  transfer,
}) {
  const endingSquareBracketIdx = relationships.indexOf("]");
  const relationshipsName = relationships.slice(1, endingSquareBracketIdx);
  const relationshipsLink = relationships.slice(endingSquareBracketIdx + 2);
  return (
    <div className={styles["content"]}>
      <Row gutter={[24, 0]}>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/" passHref>
                <FormattedLink onClick={transfer}>Home</FormattedLink>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        {transferring && (
          <Col>
            <Spin />
          </Col>
        )}
      </Row>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 500,
          lineHeight: "32px",
          marginBottom: 48,
        }}
      >
        {id}
      </h1>
      <Title
        level={3}
        style={{
          fontWeight: 500,
          lineHeight: "32px",
          marginBottom: 12,
        }}
      >
        Title
      </Title>
      <Paragraph
        style={{
          color: "rgba(51, 51, 51, 0.8)",
          lineHeight: "20px",
          marginBottom: 24,
        }}
      >
        {title}
      </Paragraph>
      <Title
        level={3}
        style={{
          fontWeight: 500,
          lineHeight: "32px",
          marginBottom: 12,
        }}
      >
        Relationships
      </Title>
      <a
        href={relationshipsLink}
        style={{
          color: "#4D6380",
          display: "block",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "20px",
          marginBottom: 24,
        }}
      >
        {relationshipsName}
      </a>
      <Title
        level={3}
        style={{
          fontWeight: 500,
          lineHeight: "32px",
          marginBottom: 12,
        }}
      >
        Description
      </Title>
      <Paragraph
        style={{
          color: "rgba(51, 51, 51, 0.8)",
          lineHeight: "20px",
          marginBottom: 24,
          maxWidth: 648,
        }}
      >
        {description}
      </Paragraph>
      <Title
        level={3}
        style={{
          fontWeight: 500,
          lineHeight: "32px",
          marginBottom: 12,
        }}
      >
        Remediation
      </Title>
      <div>
        <ReactMarkdown renderers={renderers}>{remediation}</ReactMarkdown>
      </div>
    </div>
  );
}

const renderers = {
  paragraph: ({ children }) => (
    <Paragraph
      style={{
        color: "rgba(51, 51, 51, 0.8)",
        lineHeight: "20px",
        marginBottom: 24,
      }}
    >
      {children}
    </Paragraph>
  ),
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={dark} language={language} children={value} />
    );
  },
};
