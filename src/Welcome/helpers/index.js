export let timeSinceEST = (d) => {

    var date = new Date(d);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    interval = Math.floor(seconds / 60);

    if (interval > 1) {
        return interval + " minutit tagasi";
    } else if (interval === 1) {
        return interval + " minut tagasi";
    }

    if (Math.floor(seconds) === 0) {
        return "Just nüüd";
    }

    return Math.floor(seconds) + " sekundit tagasi";
  
}

export let timeSinceENG = (d) => {

    var date = new Date(d);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    interval = Math.floor(seconds / 60);

    if (interval > 1) {
        return interval + " minutes ago";
    } else if (interval === 1) {
        return interval + " minute ago";
    }

    if (Math.floor(seconds) === 0) {
        return "Just now";
    }

    return Math.floor(seconds) + " seconds ago";
  
}