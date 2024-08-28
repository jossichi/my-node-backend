# Sử dụng hình ảnh Node.js
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép tệp package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn
COPY . .

# Chỉ định cổng chạy ứng dụng
EXPOSE 8080

# Chạy ứng dụng
CMD ["npm", "start"]
