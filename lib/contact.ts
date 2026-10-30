export const CONTACT_INFO = {
  // Primary contact phone displayed and dialed
  primaryPhone: '+91 99932 39828',
  secondaryPhone: '+91 91449 39828',
  
  // Clean raw digits for tel: and wa.me links
  rawPrimaryPhone: '919993239828',
  
  // Ready-to-use protocol links
  get telLink() {
    return `tel:+${this.rawPrimaryPhone}`;
  },
  
  get whatsappLink() {
    const message = encodeURIComponent('Hello Mahaveer Hair Solution, I would like to inquire about your hair solutions.');
    return `https://wa.me/${this.rawPrimaryPhone}?text=${message}`;
  },

  // Clinic address & hours
  address:
    'First Floor, Great Eastern (G.E.) Road, Opposite Anupam Garden & Ayurvedic College, Near Amit Sales, Raipur, Chhattisgarh – 492010',
  hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
};
