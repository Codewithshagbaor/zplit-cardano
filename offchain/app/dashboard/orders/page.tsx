"use client"

import { useState } from "react"
import { Check, Clock, Eye, MoreHorizontal, Search, ShoppingBag, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1234",
      table: "Table 5",
      status: "Completed",
      total: 78.5,
      items: 4,
      time: "12:30 PM",
      customer: "John Doe",
      items_list: [
        { name: "Grilled Salmon", price: 24.99, quantity: 1 },
        { name: "Caesar Salad", price: 12.99, quantity: 1 },
        { name: "Garlic Bread", price: 5.99, quantity: 2 },
        { name: "Sparkling Water", price: 3.99, quantity: 2 },
      ],
    },
    {
      id: "ORD-1235",
      table: "Table 2",
      status: "In Progress",
      total: 45.75,
      items: 3,
      time: "12:45 PM",
      customer: "Sarah Johnson",
      items_list: [
        { name: "Margherita Pizza", price: 18.99, quantity: 1 },
        { name: "Tiramisu", price: 8.99, quantity: 1 },
        { name: "Iced Tea", price: 3.99, quantity: 2 },
      ],
    },
    {
      id: "ORD-1236",
      table: "Table 8",
      status: "New",
      total: 62.25,
      items: 5,
      time: "1:00 PM",
      customer: "Michael Brown",
      items_list: [
        { name: "Beef Burger", price: 16.99, quantity: 2 },
        { name: "French Fries", price: 5.99, quantity: 1 },
        { name: "Chocolate Milkshake", price: 6.99, quantity: 2 },
      ],
    },
    {
      id: "ORD-1237",
      table: "Bar 1",
      status: "Completed",
      total: 32.5,
      items: 2,
      time: "1:15 PM",
      customer: "Emily Davis",
      items_list: [
        { name: "Mojito", price: 12.99, quantity: 2 },
        { name: "Nachos", price: 9.99, quantity: 1 },
      ],
    },
    {
      id: "ORD-1238",
      table: "Table 3",
      status: "Cancelled",
      total: 54.25,
      items: 3,
      time: "1:30 PM",
      customer: "David Wilson",
      items_list: [
        { name: "Pasta Carbonara", price: 19.99, quantity: 1 },
        { name: "Bruschetta", price: 8.99, quantity: 1 },
        { name: "Red Wine", price: 12.99, quantity: 1 },
      ],
    },
  ])

  const [viewingOrder, setViewingOrder] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.table.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "New"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status === "Completed" && <Check className="mr-1 h-3 w-3" />}
                          {order.status === "In Progress" && <Clock className="mr-1 h-3 w-3" />}
                          {order.status === "New" && <ShoppingBag className="mr-1 h-3 w-3" />}
                          {order.status === "Cancelled" && <X className="mr-1 h-3 w-3" />}
                          {order.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setViewingOrder(order)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {order.status !== "Completed" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Completed")}>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                            )}
                            {order.status !== "In Progress" && order.status !== "Completed" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "In Progress")}>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark as In Progress
                              </DropdownMenuItem>
                            )}
                            {order.status !== "Cancelled" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Cancelled")}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel Order
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter((order) => order.status === "New")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.table}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
                            <ShoppingBag className="mr-1 h-3 w-3" />
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setViewingOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "In Progress")}>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Completed")}>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Cancelled")}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter((order) => order.status === "In Progress")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.table}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700">
                            <Clock className="mr-1 h-3 w-3" />
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setViewingOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Completed")}>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Cancelled")}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter((order) => order.status === "Completed")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.table}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                            <Check className="mr-1 h-3 w-3" />
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setViewingOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter((order) => order.status === "Cancelled")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.table}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-700">
                            <X className="mr-1 h-3 w-3" />
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setViewingOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details - {viewingOrder?.id}</DialogTitle>
            <DialogDescription>
              {viewingOrder?.table} • {viewingOrder?.time} • {viewingOrder?.customer}
            </DialogDescription>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Status</div>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    viewingOrder.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : viewingOrder.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : viewingOrder.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                  }`}
                >
                  {viewingOrder.status === "Completed" && <Check className="mr-1 h-3 w-3" />}
                  {viewingOrder.status === "In Progress" && <Clock className="mr-1 h-3 w-3" />}
                  {viewingOrder.status === "New" && <ShoppingBag className="mr-1 h-3 w-3" />}
                  {viewingOrder.status === "Cancelled" && <X className="mr-1 h-3 w-3" />}
                  {viewingOrder.status}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Items</div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewingOrder.items_list.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right font-medium">${viewingOrder.total.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              {viewingOrder.status !== "Completed" && viewingOrder.status !== "Cancelled" && (
                <div className="flex justify-end gap-2">
                  {viewingOrder.status !== "In Progress" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStatusChange(viewingOrder.id, "In Progress")
                        setViewingOrder({ ...viewingOrder, status: "In Progress" })
                      }}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Mark as In Progress
                    </Button>
                  )}
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      handleStatusChange(viewingOrder.id, "Completed")
                      setViewingOrder({ ...viewingOrder, status: "Completed" })
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Complete Order
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
