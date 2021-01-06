import React from "react";
import { Grid, Row, Col, List, Tooltip, Typography, Button } from "antd";
import Badge from "../Badge/";
import styles from "./index.module.css";

const { useBreakpoint } = Grid;
const { Paragraph, Text } = Typography;

function Footer({ t }) {
  const screen = useBreakpoint();
  const isMobile = (screen.xs || screen.sm || screen.md) && !screen.lg;
  const currentYear = new Date().getFullYear();
  const directory = [
    {
      name: "Shield",
      url: "https://shield.certik.foundation",
    },
    {
      name: "Foundation",
      url: "https://www.certik.foundation",
    },
    {
      name: "Blog",
      url: "https://www.certik.foundation/blog",
    },
  ];
  const build = [
    {
      name: "Documentation",
      url: "https://docs.certik.foundation/certik-chain/",
    },
    {
      name: "GitHub",
      url: "https://github.com/certikfoundation",
    },
  ];
  const tools = [
    {
      name: "Explorer",
      url: "https://explorer.certik.foundation/",
    },
    {
      name: "DeepWallet",
      url: "https://wallet.certik.foundation/",
    },
  ];
  const socialMedia = [
    {
      name: "Telegram",
      icon: "/telegram.svg",
      url: "https://t.me/certikfoundation",
    },
    {
      name: "Twitter",
      icon: "/twitter.svg",
      url: "https://twitter.com/certikorg",
    },
    {
      name: "Medium",
      icon: "/medium.svg",
      url: "https://medium.com/certik-foundation",
    },
    {
      name: "WeChat",
      icon: "/wechat.svg",
      img: "/wechat-qr-code.jpg",
    },
    {
      name: "Discord",
      icon: "/discord.svg",
      url: "https://discord.gg/NcmCMSH",
    },
  ];

  return (
    <div className={styles["AppFooter"]}>
      <Row
        justify="space-between"
        gutter={[0, isMobile ? 36 : 0]}
        className="centered-container"
      >
        <Col
          span={isMobile ? 24 : null}
          style={{ textAlign: isMobile ? "center" : "start" }}
        >
          <a
            href="/"
            style={{
              display: "block",
              margin: isMobile ? "0 auto 20px" : "0 0 20px",
              width: "fit-content",
            }}
          >
            <img
              src="/certik-logo-w.png"
              alt={"CertiK Foundation Logo"}
              style={{ width: 150 }}
            />
          </a>
          <Paragraph
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: 250,
              margin: "auto",
            }}
          >
            Copyright © {currentYear} by CertiK Foundation. All rights reserved.
          </Paragraph>
          {/* <Paragraph>
            <a href="/privacy-policy">Privacy Policy</a> |{" "}
            <a href="/terms-and-condition">Terms & Conditions</a>
          </Paragraph> */}
        </Col>
        <Col
          span={isMobile ? 12 : null}
          style={{ paddingLeft: isMobile ? "10%" : 0 }}
        >
          <List
            header={<Text className={styles["nav-header"]}>Directory</Text>}
            dataSource={directory}
            renderItem={(item) => ListItemRenderer(item)}
          />
        </Col>
        <Col
          span={isMobile ? 12 : null}
          style={{ paddingLeft: isMobile ? "10%" : 0 }}
        >
          <List
            header={<Text className={styles["nav-header"]}>Build</Text>}
            dataSource={build}
            renderItem={(item) => ListItemRenderer(item)}
          />
        </Col>
        <Col
          span={isMobile ? 12 : null}
          style={{ paddingLeft: isMobile ? "10%" : 0 }}
        >
          <List
            header={<Text className={styles["nav-header"]}>Tools</Text>}
            dataSource={tools}
            renderItem={(item) => ListItemRenderer(item)}
          />
        </Col>
        <Col
          span={isMobile ? 12 : null}
          style={{ paddingLeft: isMobile ? "10%" : 0 }}
        >
          <Row gutter={[16, 8]} className={styles["AppFooter-social-links"]}>
            {socialMedia.map(({ name, icon, url, img }, i) => (
              <Col key={i + 1}>
                {url ? (
                  <a href={url} rel="noopener noreferrer" target="_blank">
                    <Badge
                      icon={icon}
                      alt={name}
                      size={36}
                      backgroundColor="rgba(255, 255, 255, 0.1)"
                    />
                  </a>
                ) : (
                  <Tooltip
                    title={
                      <img
                        src={img}
                        alt="icon"
                        style={{
                          height: 150,
                          width: 150,
                        }}
                      />
                    }
                    color="#f2f2f2"
                    placement="bottom"
                  >
                    <Badge
                      icon={icon}
                      alt={name}
                      size={36}
                      backgroundColor="rgba(255, 255, 255, 0.1)"
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </Col>
            ))}
          </Row>
          <Button
            className={styles["subscribe-button"]}
            style={{ margin: "40px 0 20px" }}
            href="https://mailchi.mp/certik.org/chain-signup"
          >
            {isMobile ? "Subscribe" : "Subscribe to Newsletter"}
          </Button>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              display: "block",
              fontSize: 12,
              fontWeight: 300,
              maxWidth: 215,
            }}
          >
            Subscribe to our newsletter updates for info on chain upgrades, bug
            bounties, and other news
          </Text>
        </Col>
      </Row>
    </div>
  );
}

function ListItemRenderer({ name, url }) {
  return (
    <List.Item>
      <a href={url}>{name}</a>
    </List.Item>
  );
}

export default Footer;
