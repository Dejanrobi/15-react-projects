const paginate = (followers) => {
  // the paginate function takes in the data.
  // No of items per page is set to 10.
  const itemsPerPage = 10
  // Number of pages to hold the data
  // we get the length of the passed array (number of followers in the data then divide it by the number of followers to be displayed in a page)

  const numberOfPages = Math.ceil(followers.length / itemsPerPage)

  // Array from returns an array with other arrays within it.
  // i.e it subdivides the entire array into individual arrays each with the same amount of data equal to itemsPerPage
  // number of pages defines the length of the entire array i.e (number of arrays within it)
  // then loops  creating the arrays starting with the index 0 to numberOfPages - 1 (because it starts with a zero)
  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    // this shows where we will start slicing the entire followers array .
    // first slice starts from 0 because index is 0* items Per Page 10 = 0,
    const start = index * itemsPerPage
    // it returns the slice from 0 to 9th index (10-1) because it zero-indexed starts with a zero
    return followers.slice(start, start + itemsPerPage)
    // second loop is 1
    // hence starts from 1*10 = 10 to 10+10 = 20
    // therefore items sliced are from index 10 to 19 because it is zero indexed and so on and so forth
  })

  return newFollowers
}

export default paginate

// therefore: the paginate function returns an array containing other arrays i.e each array is a page containing the data to be hold on that page.
// the length of this array is the number of pages to be displayed.
