const dummy = (blogs) => {
    return 1
}

const findMost = (arrOfObj, key) => {
    const tempArray = arrOfObj.map(element => element[key])
    const max = Math.max(...tempArray)
    const maxIdx = tempArray.indexOf(max)
    return arrOfObj[maxIdx]
}

const totalLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }
    
    const likesReducer = (sumOfLikes, blog) => {
        return sumOfLikes + blog.likes
    }

    return blogs.reduce(likesReducer, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }

    const mostLiked = findMost(blogs, 'likes')

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }

    let authors = []

    blogs.forEach(blog => {
        const found = authors.find(author => blog.author === author.author)
        if (found) {
            found.blogs += 1
        } else {
            authors.push(
                {
                    author: blog.author,
                    blogs: 1
                })
        }
    })

    return findMost(authors, 'blogs')
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }

    let authors = []

    blogs.forEach(blog => {
        const found = authors.find(author => blog.author === author.author)
        if (found) {
            found.likes += blog.likes
        } else {
            authors.push(
                {
                    author: blog.author,
                    likes: blog.likes
                })
        }
    })

    return findMost(authors, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}