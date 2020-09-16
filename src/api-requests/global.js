export let check_my_waiting_status = (id, code) => {

    let body = {
        id: id,
        code: code,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("/api/users/check-my-waiting-status", request)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}