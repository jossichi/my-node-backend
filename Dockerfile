# Sử dụng Node.js phiên bản 18 chính thức từ Docker Hub
FROM node:18

# Tạo và đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies trước
COPY package*.json ./

# Cài đặt các dependencies cần thiết
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng 3001 để container có thể tiếp nhận kết nối từ bên ngoài
EXPOSE 8080

# Chạy ứng dụng khi container khởi động
CMD ["node", "server.js"]

