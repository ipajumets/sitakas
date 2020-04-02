import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

const Welcome = Loadable({
    loader: () => import("./Welcome"),
    loading: () => null,
    modules: ["./Welcome"]
});

const Setup_v2 = Loadable({
    loader: () => import("./Setup_v2"),
    loading: () => null,
    modules: ["./Setup_v2"]
});

const Waiting = Loadable({
    loader: () => import("./Waiting"),
    loading: () => null,
    modules: ["./Waiting"]
});

const Board = Loadable({
    loader: () => import("./Board"),
    loading: () => null,
    modules: ["./Board"]
});

const Counter = Loadable({
    loader: () => import("./Counter"),
    loading: () => null,
    modules: ["./Counter"]
});

export default () => (
    <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/setup/:code" component={Setup_v2} />
        <Route exact path="/waiting/:code" component={Waiting} />
        <Route exact path="/game/:code" component={Board} />
        <Route exact path="/counter" component={Counter} />
    </Switch>
);