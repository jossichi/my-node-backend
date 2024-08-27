# Sử dụng image Node.js chính thức
FROM node:18

# Tạo thư mục ứng dụng
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn
COPY . .

# Expose cổng ứng dụng
EXPOSE 3001

# Khởi chạy ứng dụng
CMD ["node", "server.js"]
