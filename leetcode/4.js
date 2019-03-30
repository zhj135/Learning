// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

// You may assume nums1 and nums2 cannot be both empty.

// Example 1:

// nums1 = [1, 3]
// nums2 = [2]

// The median is 2.0
// Example 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// The median is (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
//  136 ms 39.2M
var findMedianSortedArrays = function(nums1, nums2) {
  const arr = []
  let i = 0;
  let j = 0;
  while (arr.length < nums1.length + nums2.length) {
      if (nums1[i] === undefined) {
          arr.push(nums2[j])
          j += 1
          continue
      }
      if (nums2[j] === undefined) {
          arr.push(nums1[i])
          i += 1
          continue
      }
      if (nums1[i] > nums2[j]) {
          arr.push(nums2[j])
          j += 1
      } else {
          arr.push(nums1[i])
          i += 1
      }
  }
  if (arr.length % 2 === 0) {
      return (arr[arr.length / 2 - 1] +  arr[arr.length / 2]) / 2
  }
  return arr[parseInt(arr.length / 2)]
};