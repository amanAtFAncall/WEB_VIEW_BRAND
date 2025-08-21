document.addEventListener("DOMContentLoaded", async () => {
  // url params
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  console.log("Token:", token);

  // creator data
  const response = await fetch(
    `https://shaggy-parrots-heal.loca.lt/api/api/v3/get-web-view-creators`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "x-api-key": "Aman",
        "Content-Type": "text/plain",
        Accept: "*/*",
      },
    }
  );
  console.log("Response:", response);
  const data = await response.json();

  const creatorData = data;

  // // creator data
  // const creatorData = [
  //   {
  //     id: 1,
  //     name: "Hardik Jain",
  //     image: "https://ik.imagekit.io/fancall/Rectangle%2018864-3.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Neha Kakkad",
  //     image: "https://ik.imagekit.io/fancall/Rectangle%2018864-2.png",
  //   },
  //   {
  //     id: 3,
  //     name: "Pratic Kumar",
  //     image: "https://ik.imagekit.io/fancall/Rectangle%2018864-1.png",
  //   },
  //   {
  //     id: 4,
  //     name: "Arya Parmar",
  //     image: "https://ik.imagekit.io/fancall/Rectangle%2018864.png",
  //   },
  //   {
  //     id: 5,
  //     name: "Raju Rastogi",
  //     image: "https://ik.imagekit.io/fancall/Rectangle%2018864-3.png",
  //   },
  //   {
  //     id: 6,
  //     name: "Ketrina kaif",
  //     image: "https://ik.imagekit.io/fancall/Rectangle%2018864-2.png",
  //   },
  // ];

  function createCreatorCard(creator) {
    const creatorCard = document.createElement("div");
    const creatorCardInner = document.createElement("div");
    const creatorCardImg = document.createElement("img");
    const creatorCardButton = document.createElement("button");
    const creatorCardText = document.createElement("div");
    const creatorCardLink = document.createElement("a");
    const brandName = creator.brand_name || "";
    creatorCardText.innerText =
      brandName.length > 10 ? brandName.slice(0, 10) + "..." : brandName;
    creatorCard.className = "brand-card";
    creatorCard.id = `creator-id-${creator.creator_id}`;
    creatorCard.setAttribute("data-id", creator.creator_id);

    creatorCardInner.className = "creator-inner-card";
    creatorCardImg.className = "creator-card-img";
    creatorCardButton.className = "creator-card-button";
    creatorCardLink.className = "creator-card-link";
    creatorCardText.className = "creator-card-text";

    creatorCardImg.src = creator.brand_logo;
    creatorCardLink.href = creator.creator_id; // (unchanged)
    creatorCardLink.innerText = "Top on Fancall";
    // creatorCardText.innerText = creator.brand_name?.slice(0, 10) + "...";
    creatorCardText.title = creator.brand_name; // ✅ show full text on hover

    creatorCardInner.appendChild(creatorCardImg);
    creatorCardButton.appendChild(creatorCardLink);
    creatorCard.appendChild(creatorCardInner);
    creatorCard.appendChild(creatorCardButton);
    creatorCard.appendChild(creatorCardText);

    creatorCard.addEventListener("click", () => {
      const creatorId = creatorCard.getAttribute("data-id");
      postMessageToDevice({ id: creatorId, page: "CREATOR-PROFILE" });
    });

    return creatorCard;
  }

  function postMessageToDevice(message) {
    if (window?.webkit?.messageHandlers?.elementClicked?.postMessage) {
      window?.webkit?.messageHandlers?.elementClicked?.postMessage?.(message);
    } else {
      console.error("WebKit handler not found!");
    }
  }

  // Setting Up Button Click Events
  (() => {
    // Explore Button
    document
      .querySelector("#hero-explore-button")
      .addEventListener("click", (e) => {
        console.log("Explore Button Clicked"); // Debugging
        postMessageToDevice({
          page: "EXPLORE",
        });
      });

    // Creator Card OR Button
    const creatorListContainer = document.querySelector("#creator-list");
    if (creatorListContainer) {
      for (let i = 0; i < creatorData.length; i++) {
        const creatorCard = createCreatorCard(creatorData[i]);
        creatorListContainer.appendChild(creatorCard);
      }
    }
  })();
});
