import React, { Fragment } from "react";
import { Result, Button } from "antd";
import Icon from "@ant-design/icons";

export default function ErrorFallback({ error }) {
  return (
    <Result
      icon={<Icon component={ErrorSvg} />}
      title="500"
      subTitle={
        <Fragment>
          <p>Sorry, something went wrong. </p>
          <p>
            Please refresh the page to see if it brings the page back to normal.
          </p>
          <p>
            If it keeps failing, please let the team know via the bottom right
            HELP button. Thank you!
          </p>
        </Fragment>
      }
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      }
    />
  );
}

const ErrorSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="287"
    height="184"
    fill="none"
    viewBox="0 0 287 184"
  >
    <g opacity=".8">
      <mask
        id="1c1wpr74xa"
        width="287"
        height="145"
        x="0"
        y="39"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          fill-rule="evenodd"
          d="M0 183.171h287c0-79.253-64.247-143.5-143.5-143.5S0 103.918 0 183.17"
          clip-rule="evenodd"
        />
      </mask>
      <g mask="url(#1c1wpr74xa)">
        <path
          fill="url(#paint0_radial)"
          fill-rule="evenodd"
          d="M0 183.171h287c0-79.253-64.247-143.5-143.5-143.5S0 103.918 0 183.17"
          clip-rule="evenodd"
        />
      </g>
      <path
        fill="#E1AA4C"
        fill-opacity=".6"
        fill-rule="evenodd"
        d="M143 57h1V0h-1v57zM120.085 113.1h46.839V87.294L143.468 71.93l-23.383 15.363V113.1zm47.884 1.045h-48.93V86.73l.236-.155 24.192-15.894 24.502 16.049v27.415z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-opacity=".6"
        fill-rule="evenodd"
        d="M143.467 72.968c-.742 0-1.461-.27-2.015-.767-.637-.57-1.002-1.387-1.002-2.242h1.045c0 .558.239 1.091.655 1.464.421.377.967.55 1.536.488.9-.1 1.626-.825 1.726-1.726.103-.939-.447-1.8-1.338-2.092-.68-.224-1.137-.87-1.137-1.607v-2.637h1.045v2.637c0 .28.172.533.419.614 1.365.449 2.208 1.765 2.05 3.2-.153 1.383-1.268 2.497-2.651 2.65-.111.012-.222.018-.333.018"
        clip-rule="evenodd"
      />
      <path
        fill="#BB7E1D"
        fill-rule="evenodd"
        d="M141.557 58.941l.256 4.699c.021.385.173.751.43 1.039l.002.002c.68.76 1.873.751 2.543-.018.255-.294.402-.667.415-1.055l.16-4.667-1.837 1.261-1.969-1.26z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-rule="evenodd"
        d="M143.523 57.026c-.727 0-1.318.591-1.318 1.318 0 .727.591 1.318 1.318 1.318.727 0 1.318-.591 1.318-1.318 0-.727-.591-1.318-1.318-1.318m0 3.681c-1.303 0-2.364-1.06-2.364-2.363s1.061-2.364 2.364-2.364 2.363 1.06 2.363 2.364c0 1.303-1.06 2.363-2.363 2.363"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-opacity=".6"
        fill-rule="evenodd"
        d="M167.197 87.48l-23.979-15.706.573-.875 23.979 15.707-.573.874zM120.075 114.143H143.5V87.012h-23.425v27.131z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-rule="evenodd"
        d="M143.501 114.143h23.425V87.012h-23.425v27.131zM138.997 87.011h9.006v-4.694h-9.006v4.695zM123.844 87.011h9.006v-4.694h-9.006v4.695zM154.15 87.011h9.006v-4.694h-9.006v4.695z"
        clip-rule="evenodd"
      />
      <path
        fill="#F2D9AF"
        fill-rule="evenodd"
        d="M96.65 156.047h23.425v-27.132H96.65v27.132z"
        clip-rule="evenodd"
      />
      <path
        fill="#E7D4AB"
        fill-opacity=".8"
        fill-rule="evenodd"
        d="M120.075 156.047H143.5v-27.132h-23.425v27.132zM115.572 128.915h9.006v-4.694h-9.006v4.694zM100.419 128.915h9.006v-4.694h-9.006v4.694zM130.726 128.915h9.006v-4.694h-9.006v4.694z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-opacity=".5"
        fill-rule="evenodd"
        d="M166.926 183.171h23.425v-27.132h-23.425v27.132z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-opacity=".6"
        fill-rule="evenodd"
        d="M190.351 183.171h23.425v-27.132h-23.425v27.132zM185.848 156.039h9.006v-4.694h-9.006v4.694zM170.694 156.039h9.006v-4.694h-9.006v4.694zM201.001 156.039h9.006v-4.694h-9.006v4.694zM143.501 156.047h23.425v-27.132h-23.425v27.132z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-rule="evenodd"
        d="M166.926 156.047h23.425v-27.132h-23.425v27.132zM162.423 128.915h9.006v-4.694h-9.006v4.694zM147.269 128.915h9.006v-4.694h-9.006v4.694zM177.575 128.915h9.006v-4.694h-9.006v4.694z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-opacity=".6"
        fill-rule="evenodd"
        d="M120.075 183.171H143.5v-27.132h-23.425v27.132z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-rule="evenodd"
        d="M143.501 183.171h23.425v-27.132h-23.425v27.132zM138.997 156.039h9.006v-4.694h-9.006v4.694zM123.844 156.039h9.006v-4.694h-9.006v4.694zM154.15 156.039h9.006v-4.694h-9.006v4.694z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-opacity=".6"
        fill-rule="evenodd"
        d="M73.226 183.171H96.65v-27.132H73.226v27.132z"
        clip-rule="evenodd"
      />
      <path
        fill="#E1AA4C"
        fill-rule="evenodd"
        d="M96.65 183.171h23.425v-27.132H96.65v27.132zM92.147 156.039h9.007v-4.694h-9.007v4.694zM76.994 156.039H86v-4.694h-9.006v4.694zM107.301 156.039h9.006v-4.694h-9.006v4.694z"
        clip-rule="evenodd"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(136.07 0 0 68.0349 142.715 183.288)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F6F9FB" />
        <stop offset="1" stopColor="#fff" />
      </radialGradient>
    </defs>
  </svg>
);
