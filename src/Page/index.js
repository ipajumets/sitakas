import React, { Component } from "react";
import { withRouter } from "react-router";
import Helmet from "react-helmet";

const SITE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://www.sitaratas.eu/";

const defaultIcon = require("../media/icos/favicon.ico");
const defaultTitle = "MÄNGI! Kaotaja on Sitaratas";
const defaultDescription = "Kõige parem kaardimäng+karantiini garantii";
const defaultImage = "https://i.imgur.com/jvszDw8.png";
const defaultTwitter = "@who";

class Page extends Component {

    getMetaTags(
        {
            title,
            description,
            image,
            icon,
            contentType,
            twitter,
            noCrawl,
            published,
            updated,
            category,
            tags
        },
        pathname
    )

    {
        const theTitle = title ? title : defaultTitle;
        const theDescription = description ? description.length > 150 ? description.substring(0, 155) + "..." : description : defaultDescription;
        const theImage = image ? `${SITE_URL}${image}` : defaultImage;
        const theIcon = icon ? icon : defaultIcon;

        const metaTags = [
            { itemprop: "name", content: theTitle },
            { itemprop: "description", content: theDescription },
            { itemprop: "image", content: theImage },
            { itemprop: "icon", content: theIcon },
            { name: "description", content: theDescription },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:site", content: defaultTwitter },
            { name: "twitter:title", content: theTitle },
            { name: "twitter:description", content: theDescription },
            { name: "twitter:creator", content: twitter || defaultTwitter },
            { name: "twitter:image", content: theImage },
            { property: "og:title", content: theTitle },
            { property: "og:type", content: contentType || "website" },
            { property: "og:url", content: "https://www.sitaratas.eu" + pathname },
            { property: "og:image", content: theImage },
            { property: "og:description", content: theDescription },
            { property: "og:site_name", content: defaultTitle },
        ];

        if (noCrawl) {
            metaTags.push({ name: "robots", content: "noindex, nofollow" });
        }

        if (published) {
            metaTags.push({ name: "article:published_time", content: published });
        }
        if (updated) {
            metaTags.push({ name: "article:modified_time", content: updated });
        }
        if (category) {
            metaTags.push({ name: "article:section", content: category });
        }
        if (tags) {
            metaTags.push({ name: "article:tag", content: tags });
        }

        return metaTags;

    }

    render = () => {

        const { children, id, className, ...rest } = this.props;

        return (
            <div id={id} className={className}>
                <Helmet
                    htmlAttributes={{
                        lang: "en",
                    }}
                    title={
                        rest.title ? rest.title+" | Sitaratas.eu" : defaultTitle
                    }
                    link={[
                        {
                            rel: "canonical",
                            href: SITE_URL + this.props.location.pathname,
                        },
                        {
                            rel: "icon",
                            href: rest.icon,
                        }
                    ]}
                    meta={this.getMetaTags(rest, this.props.location.pathname)}
                />
                {children}
            </div>
        );
    }
}

export default withRouter(Page);