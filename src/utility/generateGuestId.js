import Cookies from "js-cookie";


const getGuestId = () => {
  let guestId = Cookies.get("guestId");
  let userId = Cookies.get("userId");
  if (!guestId && !userId) {
    guestId = `guest_${new Date().getTime()}`;
    Cookies.set("guestId", guestId );
  }
  return guestId;
};

export default getGuestId;