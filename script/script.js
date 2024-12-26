document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.getElementById("profileButton");
  const profileDropdown = document.getElementById("profileDropdown");

  if (profileButton && profileDropdown) {
    profileButton.addEventListener("click", () => {
      profileDropdown.classList.toggle("opacity-0");
      profileDropdown.classList.toggle("invisible");
    });

    document.addEventListener("click", (event) => {
      if (
        !profileButton.contains(event.target) &&
        !profileDropdown.contains(event.target)
      ) {
        profileDropdown.classList.add("opacity-0");
        profileDropdown.classList.add("invisible");
      }
    });
  } else {
    console.error("Profile button or dropdown not found in DOM.");
  }
});
