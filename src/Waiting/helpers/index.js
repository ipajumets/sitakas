export let allReady = (players) => {

    let check = players.filter(player => player.isReady);

    return (check.length+1) === players.length;

}