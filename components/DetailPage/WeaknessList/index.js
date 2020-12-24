import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "antd";
import { FormattedLink } from "../../FormattedLink/";
import styles from "./index.module.css";
import { sortBySwcId } from "../../HomePage/SWCCards";

const { Title } = Typography;

export default function WeaknessList({ swcIds, transfer, isMobile }) {
  const router = useRouter();
  const { swcid } = router.query;
  return (
    <div
      className={styles[isMobile ? "mobile-weakness-list" : "weakness-list"]}
    >
      <Title>Weakness ID</Title>
      <ul>
        {swcIds.sort(sortBySwcId).map((swcId, i) => (
          <li key={i + 1}>
            <Link href={swcId} passHref>
              <FormattedLink
                onClick={transfer}
                style={
                  swcid === swcId
                    ? { borderColor: "#4d6380", fontWeight: 600 }
                    : {}
                }
              >
                {swcId}
              </FormattedLink>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
