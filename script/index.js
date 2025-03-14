// 

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    for (let btn of activeButtons) {
        btn.classList.remove("active")
    }

}

function loadCategories() {
    //1- fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')

    //2- convert promise to json
    .then((res) => res.json())
    // 3- send data to display
    .then((data) => displayCategories(data.categories))
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active")
        displayVideos(data.videos);
    })
}

const loadCategoryVideos = (id) => {
    const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();

        // no active class
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active")


        displayVideos(data.category)
    })
}

const loadVideoDetails = (videoId) =>{
    console.log(videoId);
    const url = (`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video))
};

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    
    detailsContainer.innerHTML=`
    
    <div class="card bg-base-100 image-full w-96 shadow-sm">
    <figure>
        <img
        src="${video.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div class="card-actions justify-end">
        </div>
    </div>
    </div>
    
    `
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories) {
        // get the container
    const categoryContainer = document.getElementById("category-container");
        // loop operation on array of object
    for (let cat of categories) {
        // console.log(cat);
            // create element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm bg-[#25252526] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        
        `
            // append the element
        categoryContainer.append(categoryDiv)
    }
        
}

// {
//     "category_id": "1003",
//     "video_id": "aaae",
//     "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
//     "title": "Inside Amy Schumer",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
//             "profile_name": "Amy Schumer",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "3.6K",
//         "posted_date": "15147"
//     },
//     "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
// }


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.innerHTML =`
        <div class=" col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[140px] h-[140px]" src="./Asset/Icon.png" alt="">
            <h2 class="text-3xl font-bold text-[#171717]">Oops!! Sorry, There is no <br>content here</h2>
        </div>
        
        `;
        return;
    }

    videos.forEach((video) => {
        // create element
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100  ">
            <figure class="relative">
                <img class:"w-full h-64 object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute buttom-2 right-2 text-white bg-black px-1 text-sm rounded">
                    3hrs 56 min ago
                </span>
            </figure>
            <div class="flex gap-3 py-5 px-0">
                <div class="profile">
                    <div class="avatar">
                        <div class="w-6 rounded-full">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="text-xl font-semibold">Midnight Serenade</h2>
                    <p class="text-gray-400 text-sm flex gap-1">${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ? `
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : `` }


                    </p>

                    <p class="text-gray-400 text-sm flex gap-1">${video.others.views} views</p>

                </div>
                
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>


        `
        // append
        videoContainer.append(videoCard)
    });
}


loadCategories();
// loadVideos();