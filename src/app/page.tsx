"use client";

import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Input,
  Select,
  Layout,
  Typography,
  Badge,
  Tag,
} from "antd";
import Image from "next/image";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function JobPortal() {
  const jobCategories = [
    { icon: "📊", title: "Bán sỉ - Bán lẻ", count: "2,071", subtext: "việc" },
    {
      icon: "🛍️",
      title: "Bán hàng - Kinh doanh",
      count: "4,001",
      subtext: "việc",
    },
    { icon: "📢", title: "Marketing", count: "1,782", subtext: "việc" },
    {
      icon: "🔧",
      title: "Khoa học - Kỹ thuật",
      count: "1,671",
      subtext: "việc",
    },
    { icon: "🔍", title: "Kiểm toán", count: "1,439", subtext: "việc" },
    {
      icon: "📋",
      title: "Hành chính - Thư ký",
      count: "1,965",
      subtext: "việc",
    },
    { icon: "📅", title: "Kế toán", count: "2,050", subtext: "việc" },
    { icon: "🎓", title: "Thực tập sinh", count: "461", subtext: "việc" },
  ];

  const urgentJobs = [
    {
      title: "Công Nhân QC",
      company: "Công Ty DKT Choongnam Việt Nam TNHH",
      salary: "10 - 20 triệu",
      location: "Đồng Nai",
      deadline: "Còn 13 ngày",
    },
    {
      title: "Nhân Viên Sản Xuất",
      company: "Công Ty DKT Choongnam Việt Nam TNHH",
      salary: "10 - 20 triệu",
      location: "Đồng Nai",
      deadline: "Còn 13 ngày",
    },
    // Add more job listings as needed
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-[#4527A0] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <Button type="text" className="text-white">
            Có hội việc làm
          </Button>
          <Button type="text" className="text-white">
            Công ty
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Select
            defaultValue="vi"
            className="w-24"
            options={[
              { value: "vi", label: "Tiếng Việt" },
              { value: "en", label: "English" },
            ]}
          />
          <Button type="primary" className="bg-white text-[#4527A0]">
            Đăng ký/Đăng nhập
          </Button>
        </div>
      </Header>

      <Content className="p-4">
        <div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
          <div className="absolute inset-0 flex items-center justify-between px-12">
            <div className="space-y-6 text-white">
              <Title level={1} className="!text-white !m-0">
                Việc đi làm ngay
                <div className="text-2xl font-normal">trong tháng 11</div>
              </Title>
              <Text className="block text-lg opacity-80">
                Phản hồi tình trạng hồ sơ trong 48h
              </Text>
              <div className="flex gap-2 p-4 bg-white rounded-lg shadow-lg">
                <Input
                  size="large"
                  placeholder="Nhập vị trí muốn ứng tuyển"
                  prefix={<SearchOutlined />}
                  className="w-80"
                />
                <Select
                  size="large"
                  placeholder="Lọc theo nghề nghiệp"
                  className="w-60"
                />
                <Select
                  size="large"
                  placeholder="Lọc theo tỉnh thành"
                  className="w-60"
                />
                <Button size="large" type="primary" className="bg-[#4527A0]">
                  Tìm việc
                </Button>
              </div>
            </div>
            <Image
              src="/placeholder.svg"
              alt="Banner"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4 mb-8">
          {jobCategories.map((category, index) => (
            <Card key={index} className="card">
              <Text className="text-3xl">{category.icon}</Text>
              <Title level={5} className="!mt-2 !mb-1">
                {category.count}
              </Title>
              <Text className="text-xs text-gray-500">{category.subtext}</Text>
              <Text className="block text-sm mt-2">{category.title}</Text>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <Title level={3} className="!mb-4">
            <span className="text-orange-500">🔥</span> Việc làm tuyển gấp
          </Title>
          <div className="grid grid-cols-3 gap-4">
            {urgentJobs.map((job, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <Title level={5} className="!m-0">
                      {job.title}
                    </Title>
                    <Text className="text-gray-500 block">{job.company}</Text>
                  </div>
                  <Button shape="circle" icon="❤️" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Text className="text-gray-500">💰</Text>
                    <Text>{job.salary}</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text className="text-gray-500">📍</Text>
                    <Text>{job.location}</Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Tag color="blue">{job.deadline}</Tag>
                    <Button type="primary" className="bg-[#4527A0]">
                      Ứng tuyển ngay
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
