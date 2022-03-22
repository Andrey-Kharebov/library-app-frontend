const currentLevelSetter = words => {
  let level = 1
  if (words.find(w => w.level === 1)) {
    level = 1
  } else if (words.find(w => w.level === 2)) {
    level = 2
  } else if (words.find(w => w.level === 3)) {
    level = 3
  } else if (words.find(w => w.level === 4)) {
    level = 4
  } else if (words.find(w => w.level === 5)) {
    level = 5
  } else if (words.find(w => w.level === 6)) {
    level = 6
  }

  return level
}

export default currentLevelSetter