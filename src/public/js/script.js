if (!window.location.href.includes("register") ||
    window.location.href.includes("login") ||
    window.location.href.includes("restore-password") ||
    window.location.href.includes("confirm-passwor")) {
    const handleLogOut = () => {
        fetch('/logout', { method: 'POST', credentials: 'same-origin' })
        window.document.location.href = "/login"
        return
    }
    window.document.getElementById("logout-button")?.addEventListener("click", handleLogOut)
}

if (window.location.href.includes("register")) {
    const avatarInputElement = window.document.getElementById("avatar-input-register")
    const avatarRegisterImg = window.document.getElementById("avatar-register-img")

    const handleClickAvatarRegisterImg = (e) => {
        avatarInputElement.click()
    }

    const handleChangeAvatarInputElement = (e) => {
        const [file] = avatarInputElement.files
        if (file) {
            avatarRegisterImg.src = URL.createObjectURL(file)
        }
    }
    avatarRegisterImg.addEventListener("click", handleClickAvatarRegisterImg)
    avatarInputElement.addEventListener("change", handleChangeAvatarInputElement)
}

if (window.location.href.includes("publication")) {
    const avatarInputElement = window.document.getElementById("publication-input")
    const avatarRegisterImg = window.document.getElementById("publication-register-img")

    const deleteCommentButtons = document.querySelectorAll(".delete-comment")
    const deletePublicationButton = document.querySelector(".delete-publication")

    const handleClickAvatarRegisterImg = (e) => {
        avatarInputElement.click()
    }

    const handleChangeAvatarInputElement = (e) => {
        const [file] = avatarInputElement.files
        if (file) {
            avatarRegisterImg.src = URL.createObjectURL(file)
        }
    }

    const handleDeletePublication = (id) => {
        // console.log(id)
        fetch(`/publication/${id}/`, { method: 'DELETE' }).then((res) => {
            console.log("BORREEEE")
            window.location.href = "/"
        })
    }

    const handleDeleteComment = (id) => {
        fetch(`/comment/${id}/`, { method: 'DELETE' }).then((res) => {
            window.location.reload()
        })
    }

    avatarRegisterImg?.addEventListener("click", handleClickAvatarRegisterImg)
    avatarInputElement?.addEventListener("change", handleChangeAvatarInputElement)

    deletePublicationButton?.addEventListener("click", () => handleDeletePublication(deletePublicationButton?.attributes.value.value))

    for (let i = 0; i < deleteCommentButtons.length; i++) {
        deleteCommentButtons[i]?.addEventListener("click", () => handleDeleteComment(deleteCommentButtons[i].attributes.value.value))
    }
}

if (window.location.href.includes("profile")) {
    const avatarInputElement = window.document.getElementById("profile-input-input")
    const avatarRegisterImg = window.document.getElementById("profile-img-input")

    const handleClickAvatarRegisterImg = (e) => {
        avatarInputElement.click()
    }

    const handleChangeAvatarInputElement = (e) => {
        const [file] = avatarInputElement.files
        if (file) {
            avatarRegisterImg.src = URL.createObjectURL(file)
        }
    }
    avatarRegisterImg.addEventListener("click", handleClickAvatarRegisterImg)
    avatarInputElement.addEventListener("change", handleChangeAvatarInputElement)
}

if (window.location.href.includes("admin")) {


    const handleDelteUser = (id) => {
        fetch(`/user/${id}/`, { method: 'DELETE' }).then((res) => {
            window.location.reload()
        })
    }
    const handleBlockUser = (id) => {
        fetch(`/user_block/${id}/`, { method: 'POST' }).then((res) => {
            window.location.reload()
        })
    }
    const handleDeletePublication = (id) => {
        fetch(`/publication/${id}/`, { method: 'DELETE' }).then((res) => {
            window.location.reload()
        })
    }
    const handleBlockPublication = (id) => {
        fetch(`/publication_block/${id}/`, { method: 'POST' }).then((res) => {
            window.location.reload()
        })
    }

    const deleteUser = window.document.querySelectorAll(".delete-user")
    const blockUser = window.document.querySelectorAll(".block-user")
    const deletePublication = window.document.querySelectorAll(".delete-publication")
    const blockPublication = window.document.querySelectorAll(".block-publication")

    for (let i = 0; i < deleteUser.length; i++) {
        deleteUser[i]?.addEventListener("click", () => handleDelteUser(deleteUser[i].attributes.value.value))
    }
    for (let i = 0; i < blockUser.length; i++) {
        blockUser[i]?.addEventListener("click", () => handleBlockUser(blockUser[i].attributes.value.value))
    }
    for (let i = 0; i < deletePublication.length; i++) {
        deletePublication[i]?.addEventListener("click", () => handleDeletePublication(deletePublication[i].attributes.value.value))
    }
    for (let i = 0; i < blockPublication.length; i++) {
        blockPublication[i]?.addEventListener("click", () => handleBlockPublication(blockPublication[i].attributes.value.value))
    }

}

