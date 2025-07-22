'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Shield, BarChart, Users, FileText, MoreHorizontal, PlusCircle, Link, Star, UserPlus, Gift, ShieldAlert, Zap } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart } from 'recharts';
import { useToast } from '@/hooks/use-toast';


const chartData = [
  { feature: 'Aim Assist', count: 186 },
  { feature: 'No Recoil', count: 305 },
  { feature: 'FPS Unlock', count: 237 },
  { feature: 'Aimbot', count: 73 },
  { feature: 'Enemy Location', count: 209 },
  { feature: 'Bullet Tracker', count: 150 },
];

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--primary))',
  },
};

const usersData = [
    { id: 'USR001', deviceId: 'DEV-A1B2C3D4', status: 'Active', configs: 5, isVip: true },
    { id: 'USR002', deviceId: 'DEV-E5F6G7H8', status: 'Active', configs: 2, isVip: false },
    { id: 'USR003', deviceId: 'DEV-I9J0K1L2', status: 'Banned', configs: 12, isVip: false },
    { id: 'USR004', deviceId: 'DEV-M3N4O5P6', status: 'Active', configs: 8, isVip: true },
    { id: 'USR005', deviceId: 'DEV-Q7R8S9T0', status: 'Active', configs: 1, isVip: false },
]

const issuesData = [
    { id: 'ERR001', description: 'Failed to generate config for user USR003.', timestamp: '2024-07-30 10:45:12', severity: 'High' },
    { id: 'ERR002', description: 'API rate limit exceeded for Gemini.', timestamp: '2024-07-30 09:12:54', severity: 'Medium' },
    { id: 'ERR003', description: 'UI render error on /login page.', timestamp: '2024-07-29 18:30:00', severity: 'Low' },
];

export function AdminDashboard() {
  const { toast } = useToast();
  
  const handleFixIssue = (issueId: string) => {
    toast({
      title: `Attempting to fix issue ${issueId}`,
      description: 'Automated resolution in progress...',
    });
    // Placeholder for actual fix logic
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
       <div className="w-full flex flex-col items-center text-center mb-12">
        <div 
          className="mb-4 text-primary"
          style={{ filter: `drop-shadow(0 0 8px hsl(var(--primary)))` }}
        >
          <Shield size={64} />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          Admin Panel
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Welcome to the control center. Here's what's happening with your app.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Configs Generated
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,250</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Popular Feature
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">No Recoil</div>
            <p className="text-xs text-muted-foreground">
              305 selections this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Feature Usage Statistics</CardTitle>
                <CardDescription>A breakdown of the most popular features selected by users.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <RechartsBarChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="feature"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Sponsorship</CardTitle>
                    <CardDescription>Manage sponsorship content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Sponsor
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                  <CardTitle>Invite a Friend</CardTitle>
                  <CardDescription>Generate a referral link to share.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Generate Link
                  </Button>
                </CardContent>
              </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Manage social media links.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full">
                        <Link className="mr-2 h-4 w-4" /> Update Links
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-destructive" />
            <div>
              <CardTitle>System Health</CardTitle>
              <CardDescription>View and manage critical application issues.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Error ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issuesData.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell>{issue.description}</TableCell>
                  <TableCell>{issue.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={issue.severity === 'High' ? 'destructive' : 'default'}>
                      {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleFixIssue(issue.id)}>
                      <Zap className="mr-2 h-4 w-4" />
                      Auto-Fix
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all registered users.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add User
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Device ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Configs</TableHead>
                        <TableHead>VIP</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersData.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.deviceId}</TableCell>
                            <TableCell>
                                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className="bg-green-600/20 text-green-400 border-green-400/20 hover:bg-green-600/30">
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.configs}</TableCell>
                            <TableCell>
                                {user.isVip && <Star className="h-5 w-5 text-yellow-400" />}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                                        <DropdownMenuItem>{user.isVip ? 'Revoke VIP' : 'Grant VIP'}</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                            {user.status === 'Banned' ? 'Unblock User' : 'Block User'}
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

    </div>
  );
}

    