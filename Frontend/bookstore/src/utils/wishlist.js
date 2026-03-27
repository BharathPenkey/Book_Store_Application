export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const toggleWishlist = (book) => {
  let wishlist = getWishlist();

  const exists = wishlist.find((b) => b._id === book._id);

  if (exists) {
    wishlist = wishlist.filter((b) => b._id !== book._id);
  } else {
    wishlist.push(book);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  return wishlist;
};

export const isInWishlist = (id) => {
  return getWishlist().some((b) => b._id === id);
};