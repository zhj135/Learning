// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */ 
// 148 ms, 34.3 MB
var twoSum = function(nums, target) {
  for(let i = 0; i <= nums.length; i += 1) {
      let temp = nums[i]
      for(let j = i + 1; j <= nums.length; j += 1) {
          if (temp + nums[j] === target) return [i, j]
      }
  }
};
// 60 ms, 34.9 MB
var twoSum = function(nums, target) {
  const map = new Map()
  for(let i=0; i<=nums.length; i++) {
      const find = map.get(target - nums[i])
      if (find || find === 0) {
          return [find, i]
      }
      map.set(nums[i], i)
  }
};