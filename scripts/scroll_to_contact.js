function scrollToContactDetails() {
    const contactDetailsSection = document.getElementById('contactDetails');
    if (contactDetailsSection) {
        contactDetailsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
window.scrollToContactDetails = scrollToContactDetails;
