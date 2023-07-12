import * as React from "react";
import {
  getLanguagePrefix,
  getUiLanguage,
  useLocalization,
} from "../../utils/localization";
// import * as CSS from "../../components/Feeds/_feed-entry.module.scss";
import NoImg from "../../images/No-preview.jpg";
import NoImgFi from "../../images/no-img-fi.jpg";
import ProppuNoImg from "../../images/talo-place-holder.png";
import Link from "next/link";
import Image from "next/image";

//Mihai here: this component represents how each individual feed should look like

export type Entry = {
  budget: "Hourly" | "Fixed";
  category: string;
  category_id: number;
  category_type: "Work" | "Material";
  city: string;
  city_identifier: string;
  cost_per_unit: string | null;
  description: string;
  extra: number;
  featured_image: string;
  id: number;
  quantity: string | null;
  rate: string | null;
  state: number;
  state_identifier: string;
  time_left: string;
  title: string;
  type: "Request" | "Offer";
  unit: string | null;
  user_id: number;
  units: string;
  ids: number;
};

//for breakpoints in text
const NewlineText = (props: any) => {
  const text = props.text;
  const newText = text.split("\n").map((str: any, index: number) => (
    <p key={index} className={"feedEntryDescription text-break"}>
      {str}
    </p>
  ));
  return newText;
};

const IMAGE_PREFIX = "marketplace/material/";

export const FeedEntry = ({
  feedEntry,
  imageUrl,
}: {
  feedEntry: Entry;
  imageUrl: string;
}) => {
  const [t, language] = useLocalization();
  // console.log(feedEntry.featured_image);

  return (
    <Link href={{ pathname: "/app/feed", query: { id: feedEntry.id } }}>
      <div className={"feedEntry"}>
        <div className={"feedEntryImage"}>
          {feedEntry.featured_image ? (
            <img
              src={`${imageUrl}${IMAGE_PREFIX}${feedEntry.featured_image}`}
              alt="Feed entry image"
            />
          ) : getUiLanguage() === "english" ? (
            <Image className="w-100" src={ProppuNoImg} alt="No image" />
          ) : (
            <Image src={ProppuNoImg} alt="No image" />
          )}
        </div>

        <div className={"feedEntryDetails"}>
          <h3 className={"feedEntryTitle"}>
            {feedEntry.title}
            {/* <Link href={{ pathname: "/app/feed", query: { id: feedEntry.id } }}>
                        {language === "english" ? (
                            <button>{t("pages.feed.bidNow")}</button>
                        ) : (
                            <button>
                                {feedEntry.type === "Offer" ? "Pyydä tarjous" : "Tee tarjous"}
                            </button>
                        )}
                    </Link> */}
          </h3>

          <NewlineText
            text={
              feedEntry.description.length > 100
                ? `${feedEntry.description.substring(0, 100)}...`
                : feedEntry.description
            }
          />
          <div className="material-qty-exp">
            <div className="material">
              <ul className="material--offer">
                {feedEntry.category_type === "Material" ? (
                  <li>{t("pages.feed.material")}</li>
                ) : (
                  <li>{t("pages.feed.work")}</li>
                )}
                {feedEntry.type === "Request" ? (
                  <li>{t("pages.feed.filter.request")}</li>
                ) : (
                  <li>{t("pages.feed.filter.offer")}</li>
                )}
                {/* {feedEntry.extra === 1 ? <li>{t("pages.feed.filter.workIncluded")}</li> : ""}
                    {feedEntry.extra === 2 ? (
                        <li>{t("pages.feed.filter.materialIncluded")}</li>
                    ) : (
                        ""
                    )} */}
                <li>
                  {feedEntry.state_identifier ? (
                    <li> {feedEntry.state_identifier}</li>
                  ) : null}
                </li>
              </ul>
            </div>

            <div className="quantity">
              {/* {feedEntry.unit ? (
                            <p>
                                Unit <span>{feedEntry.unit}</span>
                            </p>
                        ) : (
                            ""
                        )} */}
              {feedEntry.quantity ? (
                <p>
                  <div>
                    {feedEntry.quantity} {feedEntry.unit}
                  </div>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="expired">
              {t("pages.feed.closingTime", "Closing:")}{" "}
              {t(new Date(feedEntry.time_left))}
            </div>
          </div>

          {/* <div className={"feedEntryUnits"}>
                    {feedEntry.unit ? (
                        <p>
                            Unit <span>{feedEntry.unit}</span>
                        </p>
                    ) : (
                        ""
                    )}
                    {feedEntry.quantity ? (
                        <p>
                            Qty <span>{feedEntry.quantity}</span>
                        </p>
                    ) : (
                        ""
                    )}

                    <p>
                        {t("pages.feed.closingTime", "Closing:")}{" "}
                        <span>{t(new Date(feedEntry.time_left))}</span>
                    </p>
                </div> */}
        </div>
      </div>
    </Link>
  );
};
