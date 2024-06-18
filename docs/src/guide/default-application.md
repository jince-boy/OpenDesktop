# Default System Applications

This framework provides some default applications for users too quickly.

## Application List {#setting}

### Settings

``` ts
{
    name: 'Settings',
    key: 'setting',
    icon: setting,
    version: '1.0.0',
    window: {
        title: 'Settings',
        width: 1100,
        minWidth: 1000,
        minHeight: 560,
        height: 600,
        icon: setting,
        key: 'setting',
        content: Setting,
        backgroundColor: 'rgb(239, 244, 249)'
    }
}
```