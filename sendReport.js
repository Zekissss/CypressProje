const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendEmailReport() {
  // E-posta gönderici ayarları
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',       
      pass: 'your-email-password'          
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
        path: './cypress/reports/mochawesome.html' 
      },
      {
        filename: 'test-video.mp4',
        path: './cypress/videos/test-video.mp4'    
      }
    ]
  };

  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Hata oluştu:', error);  
    } else {
      console.log('E-posta başarıyla gönderildi:', info.response); 
    }
  });
}


sendEmailReport();
