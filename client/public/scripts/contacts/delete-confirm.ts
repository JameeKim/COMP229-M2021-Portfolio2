/**
 * client/public/scripts/contacts/delete-confirm.ts
 *
 * Set up the modal for confirming deletion of contacts items
 *
 * Dohyun Kim 301058465
 * Jun. 18, 2021
 */

(() => {
    // register the event listener on the modal to populate needed data
    const setup = () => {
        // the modal element
        const modal = document.getElementById("contacts-delete-confirm-modal");

        // if the modal is not found, there is nothing to do
        if (!modal) {
            return;
        }

        // cache the elements to be used inside the event callback
        const detailed: HTMLElement = modal.querySelector("#contacts-delete-confirm-detailed")!;
        const simple: HTMLElement = modal.querySelector("#contacts-delete-confirm-this")!;
        const numberSpan = modal.querySelector("#contacts-delete-confirm-number")!;
        const nameSpan = modal.querySelector("#contacts-delete-confirm-name")!;
        const deleteLink = modal.querySelector("#contacts-delete-confirm-link")!;

        // the modal show event callback
        const modalShowCallback: EventListener = (ev) => {
            // @ts-ignore
            const deleteButton: HTMLElement = ev.relatedTarget;

            // set the uri for the delete request
            const itemId = deleteButton.getAttribute("data-contacts-delete-id");
            deleteLink.setAttribute("href", `/contacts/delete/${itemId}`);

            // get the number of the contact item
            const itemNumber = deleteButton.getAttribute("data-contacts-delete-number");

            // if there is no number set, the modal is in the edit page
            // therefore, only show the simple version
            if (typeof(itemNumber) !== "string") {
                detailed.style.display = "none";
                simple.style.display = "inline";
                return;
            }

            // the modal is in the list page
            // therefore, show the detailed version
            detailed.style.display = "inline";
            simple.style.display = "none";

            // get the name of the contact
            const contactName = deleteButton.getAttribute("data-contacts-delete-name");

            // set the values to show
            numberSpan.textContent = itemNumber;
            nameSpan.textContent = contactName;
        };

        // register the callback for modal show event
        modal.addEventListener("show.bs.modal", modalShowCallback);
    };

    // set up the modal when the window loads
    window.addEventListener("load", setup);
})();
