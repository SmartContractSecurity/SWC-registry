import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Row, Col, AutoComplete, Input, Typography } from "antd";
import { getFirstNumIdx, isNumber } from "../../../utils";

import styles from "./index.module.css";

const { Search } = Input;
const { Title } = Typography;

export default function SWCSearcher({ swcs }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  return (
    <div className={styles["search-card-wrapper"]}>
      <div className="centered-container">
        <Card
          bordered={false}
          className={`card ${styles["search-card"]}`}
          bodyStyle={{ padding: 0 }}
        >
          <Row>
            <Col span={24}>
              <AutoComplete
                dropdownMatchSelectWidth={252}
                options={getRecommendations(swcs, keyword, router)}
                onSelect={(e) => router.push(e)}
              >
                <Search
                  value={keyword}
                  placeholder="Search a SWC by id / title"
                  onChange={(value) => setKeyword(value.target.value)}
                />
              </AutoComplete>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

function getRecommendations(swcs, keyword) {
  const matchingSWCS = findSWCs(swcs, keyword);
  return matchingSWCS.map(({ id, content: { Title: title } }) => ({
    value: id,
    label: (
      <Link href={`/${id}`}>
        <Row gutter={[16, 0]}>
          <Col style={{ alignItems: "center", display: "flex" }}>
            <Title level={4} style={{ color: "#e1aa4c", margin: 0 }}>
              {id}
            </Title>
          </Col>
          <Col
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Title
              level={5}
              style={{
                display: "block",
                margin: 0,
                overflow: "hidden",
                textTransform: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Title>
          </Col>
        </Row>
      </Link>
    ),
  }));
}

function findSWCs(swcs, keyword) {
  if (!keyword) return [];
  const searchTerm = keyword.toLowerCase();
  const searchTermNumIdx = getFirstNumIdx(searchTerm);
  const swcIds = Object.keys(swcs);
  const swcsWithIdAndTitle = swcIds.map((id) => ({
    id,
    title: swcs[id].content.Title.toLowerCase(),
  }));
  let matchingIds;
  if (isValidNumericString(searchTerm)) {
    matchingIds = swcIds.filter((idStr) => idStr.includes(searchTerm));
  } else if (
    (searchTerm.includes("swc") &&
      searchTerm.includes("ctk") &&
      searchTerm.indexOf("swc") === 0 &&
      searchTerm.indexOf("ctk") >= searchTerm.indexOf("swc") + 3) ||
    searchTerm.includes("ctk")
  ) {
    matchingIds = swcIds.filter(
      (idStr) =>
        idStr.includes("SWC") &&
        idStr.includes("CTK") &&
        idStr.includes(searchTerm.slice(searchTermNumIdx)) &&
        idStr
          .slice(getFirstNumIdx(idStr))
          .indexOf(searchTerm.slice(searchTermNumIdx)) === 0
    );
  } else if (searchTerm.includes("swc")) {
    matchingIds = swcIds.filter(
      (idStr) =>
        idStr.includes("SWC") &&
        idStr.includes(searchTerm.slice(getFirstNumIdx(searchTerm))) &&
        idStr
          .slice(getFirstNumIdx(idStr))
          .indexOf(searchTerm.slice(searchTermNumIdx)) === 0
    );
  } else {
    if (searchTerm.length < 3) return [];
    matchingIds = swcsWithIdAndTitle
      .filter((swc) => swc.title.includes(searchTerm))
      .map((swc) => swc.id);
  }
  return matchingIds.map((id) => ({ id, ...swcs[id] }));
}

function isValidNumericString(str) {
  const numericSearchTerm = parseInt(str, 10);
  if (numericSearchTerm.toString() === "NaN") return false;
  return (
    isNumber(numericSearchTerm) &&
    numericSearchTerm.toString().length === str.length
  );
}
