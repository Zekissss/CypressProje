const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendEmailReport() {
  // E-posta gönderici ayarları
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',       // Kendi e-posta adresiniz
      pass: 'your-email-password'          // Uygulama şifreniz veya e-posta şifreniz
    }
  });

  
  const mailOptions = {
    from: 'mosturk68@gmail.com',         
    to: 'zekiyeerbas35@gmail.com',    
    subject: 'Cypress Test Report',       
    text: 'Please find the attached Cypress test report.', 
    attachments: [
      {
        filename: 'mochawesome.html',
        path: './cypress/reports/mochawesome.html' // Rapor dosyası
      },
      {
        filename: 'test-video.mp4',
        path: './cypress/videos/test-video.mp4'    // Test video dosyası
      }
    ]
  };

  // E-posta gönderim fonksiyonu
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Hata oluştu:', error);  // Hata varsa konsola yazdır
    } else {
      console.log('E-posta başarıyla gönderildi:', info.response); // Başarı mesajı
    }
  });
}

// Fonksiyonu çalıştır
sendEmailReport();
