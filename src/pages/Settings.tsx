
import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const Settings = () => {
  const [activeMenuItem, setActiveMenuItem] = React.useState('settings');
  
  return (
    <div className="flex h-screen bg-dashboard-dark-bg">
      <DashboardSidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          selectedSector="Technology"
          cciValue={100}
          cciChange={0}
          avgReturn={0}
          avgReturnChange={0}
          volatility={0}
          volatilityChange={0}
          onRefresh={() => {}}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="dashboard-card p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Settings</h1>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                        <p className="text-sm text-dashboard-light-gray">Use dark theme for the dashboard</p>
                      </div>
                      <Switch id="dark-mode" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
                        <p className="text-sm text-dashboard-light-gray">Enhance visual contrast</p>
                      </div>
                      <Switch id="high-contrast" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Display Settings</h2>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="animations" className="font-medium">Chart Animations</Label>
                        <p className="text-sm text-dashboard-light-gray">Enable chart animations</p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compact-view" className="font-medium">Compact View</Label>
                        <p className="text-sm text-dashboard-light-gray">Show more content with less spacing</p>
                      </div>
                      <Switch id="compact-view" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="tooltips" className="font-medium">Show Tooltips</Label>
                        <p className="text-sm text-dashboard-light-gray">Display helpful tips when hovering</p>
                      </div>
                      <Switch id="tooltips" defaultChecked />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Default Values</h2>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="default-sector" className="font-medium">Default Sector</Label>
                      <select 
                        id="default-sector" 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-dashboard-dark-bg p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="technology">Technology</option>
                        <option value="energy">Energy</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="consumer">Consumer</option>
                      </select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="time-period" className="font-medium">Default Time Period</Label>
                      <select 
                        id="time-period" 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-dashboard-dark-bg p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="1M">1 Month</option>
                        <option value="3M">3 Months</option>
                        <option value="6M">6 Months</option>
                        <option value="1Y" selected>1 Year</option>
                        <option value="3Y">3 Years</option>
                      </select>
                    </div>
                  </div>

                  <Button className="mt-6 w-full">Save General Settings</Button>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Data Source Configuration</h2>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="api-key" className="font-medium">Alpha Vantage API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="api-key" 
                          type="password" 
                          placeholder="Enter your API key" 
                          value="298NP5RGYWOAV0EC"
                          className="bg-dashboard-dark-bg"
                        />
                        <Button variant="outline">Verify</Button>
                      </div>
                      <p className="text-xs text-dashboard-light-gray">Your API request quota: 25 requests/day</p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="data-frequency" className="font-medium">Data Refresh Frequency</Label>
                      <select 
                        id="data-frequency" 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-dashboard-dark-bg p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="manual">Manual Only</option>
                        <option value="daily" selected>Daily</option>
                        <option value="hourly">Hourly</option>
                        <option value="realtime">Real-time (Premium)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cache-data" className="font-medium">Cache Data</Label>
                        <p className="text-sm text-dashboard-light-gray">Store data locally to reduce API calls</p>
                      </div>
                      <Switch id="cache-data" defaultChecked />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Additional Data Sources</h2>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-fed" className="font-medium">Federal Reserve Data</Label>
                        <p className="text-sm text-dashboard-light-gray">Import interest rate and economic data</p>
                      </div>
                      <Switch id="enable-fed" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-yahoo" className="font-medium">Yahoo Finance</Label>
                        <p className="text-sm text-dashboard-light-gray">Import additional stock market data</p>
                      </div>
                      <Switch id="enable-yahoo" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-census" className="font-medium">Census Bureau</Label>
                        <p className="text-sm text-dashboard-light-gray">Import demographic and economic indicators</p>
                      </div>
                      <Switch id="enable-census" />
                    </div>
                  </div>

                  <Button className="mt-6 w-full">Save Data Settings</Button>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Alert Settings</h2>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-alerts" className="font-medium">Enable Alerts</Label>
                        <p className="text-sm text-dashboard-light-gray">Receive notifications about important events</p>
                      </div>
                      <Switch id="enable-alerts" defaultChecked />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="alert-threshold" className="font-medium">CCI Change Threshold (%)</Label>
                      <Input 
                        id="alert-threshold" 
                        type="number" 
                        placeholder="5" 
                        defaultValue="5"
                        className="bg-dashboard-dark-bg"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label className="font-medium">Alert Types</Label>
                      <div className="grid gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="alert-cci" defaultChecked />
                          <Label htmlFor="alert-cci">CCI Significant Changes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="alert-returns" defaultChecked />
                          <Label htmlFor="alert-returns">Sector Return Anomalies</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="alert-correlations" defaultChecked />
                          <Label htmlFor="alert-correlations">Correlation Pattern Changes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="alert-model" />
                          <Label htmlFor="alert-model">Model Prediction Updates</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Notification Delivery</h2>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email-address" className="font-medium">Email Address</Label>
                      <Input 
                        id="email-address" 
                        type="email" 
                        placeholder="your@email.com"
                        className="bg-dashboard-dark-bg"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="browser-notif" className="font-medium">Browser Notifications</Label>
                        <p className="text-sm text-dashboard-light-gray">Show alerts in the browser</p>
                      </div>
                      <Switch id="browser-notif" defaultChecked />
                    </div>
                  </div>

                  <Button className="mt-6 w-full">Save Notification Settings</Button>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="font-medium">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        className="bg-dashboard-dark-bg"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="account-email" className="font-medium">Email Address</Label>
                      <Input 
                        id="account-email" 
                        type="email" 
                        placeholder="john@example.com"
                        className="bg-dashboard-dark-bg"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label className="font-medium">Subscription Plan</Label>
                      <div className="flex justify-between items-center border border-dashboard-dark-gray rounded-md p-3">
                        <div>
                          <p className="font-medium">Free Plan</p>
                          <p className="text-sm text-dashboard-light-gray">Basic access with limited data</p>
                        </div>
                        <Button variant="outline" size="sm">Upgrade</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Security</h2>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password" className="font-medium">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="bg-dashboard-dark-bg"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-password" className="font-medium">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="bg-dashboard-dark-bg"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password" className="font-medium">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="••••••••"
                        className="bg-dashboard-dark-bg"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-dashboard-light-gray">Enable 2FA for additional security</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <Button className="mt-6 w-full">Save Account Settings</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
