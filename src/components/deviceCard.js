import React from "react";
import deviceImage from "src/assets/images/Dummy_Product_Pic.png";
import { useTranslation } from "react-i18next";

export default function Devicecard(item) {
  const [t, I18n] = useTranslation();

  let devicecardData = item.deviceInfo ? item.deviceInfo : "";

  return (
    <>
      {devicecardData && devicecardData[0] ? (
        devicecardData.map((item, index) => (
          <div key={index} className="margin-5">
            <div style={{ margin: 5, cursor: "pointer" }}>
              <div className="ui link cards">
                <div style={{ padding: "5px" }} className="card">
                  <div
                    className="image d-flex justify-content-center"
                    style={{ marginTop: 10 }}
                  >
                    <img
                      className="device-card-image"
                      src={deviceImage}
                      alt=" "
                    ></img>
                  </div>

                  <div className="content">
                    <div
                      className="d-flex flex-row justify-content-between"
                      style={{ marginTop: 10 }}
                    >
                      <span className="device-card-submenu-title">
                        {t("card.fluidLevel")}:
                      </span>
                      <span className="device-card-submenu-value">
                        {item.fluidLevel}
                      </span>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                      <span className="device-card-submenu-title">
                        {t("card.pumpingQty")}:
                      </span>
                      <span className="device-card-submenu-value">
                        {item.pumpingQty}
                      </span>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                      <span className="device-card-submenu-title">
                        {t("card.frequency")}:
                      </span>
                      <span className="device-card-submenu-value">
                        5 times/day
                      </span>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                      <span className="device-card-submenu-title">
                        {t("card.status")}:
                      </span>
                      <span className="device-card-submenu-value">Active</span>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                      <span className="device-card-submenu-title">
                        {t("card.battery")}:
                      </span>
                      <span className="device-card-submenu-value">
                        {item.batteryPercentage}%
                      </span>
                    </div>

                    <div className="d-flex flex-row justify-content-between">
                      <span className="device-card-submenu-title">
                        {t("card.deviceTag")}:
                      </span>
                      <span className="device-card-submenu-value">
                        {item.tag ? item.tag : "NA"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">{t("card.noDevice")}...</div>
      )}
    </>
  );
}
