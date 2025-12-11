-------------------------------------

Translated Report (Full Report Below)
-------------------------------------

Process:             closeyourtab [65503]
Path:                /Users/USER/Library/Developer/CoreSimulator/Devices/13B9FB16-6113-408A-AD8A-A155750309D9/data/Containers/Bundle/Application/A5D7C373-750A-40A4-BE87-A5FC64D28CE5/closeyourtab.app/closeyourtab
Identifier:          com.peacockerystudio.closeyourtab
Version:             1.0.0 (1)
Code Type:           ARM-64 (Native)
Role:                Foreground
Parent Process:      launchd_sim [40137]
Coalition:           com.apple.CoreSimulator.SimDevice.13B9FB16-6113-408A-AD8A-A155750309D9 [11555]
Responsible Process: SimulatorTrampoline [27903]
User ID:             501

Date/Time:           2025-12-01 23:40:01.7447 -0700
Launch Time:         2025-12-01 17:20:28.8733 -0700
Hardware Model:      Mac16,12
OS Version:          macOS 26.1 (25B78)
Release Type:        User

Crash Reporter Key:  981B5D7E-3D27-315C-9DC1-A2E05AA64425
Incident Identifier: 809C4C94-24DA-46A3-8222-0CE7A3C11464

Sleep/Wake UUID:       EEA19AB1-6269-4921-8CC2-2AE2D02EF5D8

Time Awake Since Boot: 440000 seconds
Time Since Wake:       1951 seconds

System Integrity Protection: enabled

Triggered by Thread: 0, Dispatch Queue: com.apple.main-thread

Exception Type:    EXC_CRASH (SIGABRT)
Exception Codes:   0x0000000000000000, 0x0000000000000000

Termination Reason:  Namespace SIGNAL, Code 6, Abort trap: 6
Terminating Process: closeyourtab [65503]

Last Exception Backtrace:
0   CoreFoundation                        0x1804f71c4 __exceptionPreprocess + 160
1   libobjc.A.dylib                       0x18009c094 objc_exception_throw + 72
2   CoreFoundation                        0x1803d52f0 -[__NSArrayM insertObject:atIndex:] + 1584
3   closeyourtab.debug.dylib              0x1080d1c28 -[AIRMap insertReactSubview:atIndex:] + 888 (AIRMap.m:138)
4   React                                 0x10d90f6f0 -[RCTLegacyViewManagerInteropComponentView finalizeUpdates:] + 1312
5   React                                 0x10d9e5dc8 RCTPerformMountInstructions(std::__1::vector<facebook::react::ShadowViewMutation, std::__1::allocator<facebook::react::ShadowViewMutation>> const&, RCTComponentViewRegistry*, RCTMountingTransactionObserverCoordinator&, int) + 2060
6   React                                 0x10d9e55b0 -[RCTMountingManager performTransaction:]::$_1::operator()(facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) const + 80
7   React                                 0x10d9e5554 decltype(std::declval<-[RCTMountingManager performTransaction:]::$_1&>()(std::declval<facebook::react::MountingTransaction const&>(), std::declval<facebook::react::SurfaceTelemetry const&>())) std::__1::__invoke[abi:de180100]<-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&>(-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) + 40
8   React                                 0x10d9e54fc void std::__1::__invoke_void_return_wrapper<void, true>::__call[abi:de180100]<-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&>(-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) + 40
9   React                                 0x10d9e54c8 std::__1::__function::__alloc_func<-[RCTMountingManager performTransaction:]::$_1, std::__1::allocator<-[RCTMountingManager performTransaction:]::$_1>, void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()[abi:de180100](facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) + 44
10  React                                 0x10d9e4344 std::__1::__function::__func<-[RCTMountingManager performTransaction:]::$_1, std::__1::allocator<-[RCTMountingManager performTransaction:]::$_1>, void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()(facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) + 44
11  React                                 0x10d7ed68c std::__1::__function::__value_func<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()[abi:de180100](facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) const + 84
12  React                                 0x10d7ebb80 std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()(facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) const + 40
13  React                                 0x10d7eb9b0 facebook::react::TelemetryController::pullTransaction(std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)> const&, std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)> const&, std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)> const&) const + 300
14  React                                 0x10d9dc1b8 -[RCTMountingManager performTransaction:] + 564
15  React                                 0x10d9dbed4 -[RCTMountingManager initiateTransaction:] + 428
16  React                                 0x10d9db56c -[RCTMountingManager scheduleTransaction:] + 72
17  React                                 0x10da00cf8 -[RCTSurfacePresenter schedulerShouldRenderTransactions:] + 76
18  React                                 0x10d9f02a8 SchedulerDelegateProxy::schedulerShouldRenderTransactions(std::__1::shared_ptr<facebook::react::MountingCoordinator const> const&) + 104
19  React                                 0x10d8123d8 facebook::react::Scheduler::uiManagerDidFinishTransaction(std::__1::shared_ptr<facebook::react::MountingCoordinator const>, bool) + 364
20  React                                 0x10d85f66c facebook::react::UIManager::shadowTreeDidFinishTransaction(std::__1::shared_ptr<facebook::react::MountingCoordinator const>, bool) const + 140
21  React                                 0x10d7d65dc facebook::react::ShadowTree::mount(facebook::react::ShadowTreeRevision, bool) const + 168
22  React                                 0x10d7d6e94 facebook::react::ShadowTree::tryCommit(std::__1::function<std::__1::shared_ptr<facebook::react::RootShadowNode> (facebook::react::RootShadowNode const&)> const&, facebook::react::ShadowTreeCommitOptions const&) const + 1212
23  React                                 0x10d7d68c8 facebook::react::ShadowTree::commit(std::__1::function<std::__1::shared_ptr<facebook::react::RootShadowNode> (facebook::react::RootShadowNode const&)> const&, facebook::react::ShadowTreeCommitOptions const&) const + 256
24  closeyourtab.debug.dylib              0x107b68f64 reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0::operator()(facebook::react::ShadowTree const&) const + 116 (ReanimatedModuleProxy.cpp:1167)
25  closeyourtab.debug.dylib              0x107b68ee4 decltype(std::declval<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&>()(std::declval<facebook::react::ShadowTree const&>())) std::__1::__invoke[abi:de200100]<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&>(reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&) + 32 (invoke.h:179)
26  closeyourtab.debug.dylib              0x107b68eb8 void std::__1::__invoke_void_return_wrapper<void, true>::__call[abi:de200100]<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&>(reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&) + 32 (invoke.h:252)
27  closeyourtab.debug.dylib              0x107b68e8c void std::__1::__invoke_r[abi:de200100]<void, reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&>(reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&) + 32 (invoke.h:273)
28  closeyourtab.debug.dylib              0x107b68e60 std::__1::__function::__alloc_func<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0, std::__1::allocator<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0>, void (facebook::react::ShadowTree const&)>::operator()[abi:de200100](facebook::react::ShadowTree const&) + 32 (function.h:167)
29  closeyourtab.debug.dylib              0x107b686a0 std::__1::__function::__func<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0, std::__1::allocator<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0>, void (facebook::react::ShadowTree const&)>::operator()(facebook::react::ShadowTree const&) + 36 (function.h:319)
30  React                                 0x10d7e49b0 std::__1::__function::__value_func<void (facebook::react::ShadowTree const&)>::operator()[abi:de180100](facebook::react::ShadowTree const&) const + 76
31  React                                 0x10d7e1bac std::__1::function<void (facebook::react::ShadowTree const&)>::operator()(facebook::react::ShadowTree const&) const + 32
32  React                                 0x10d7e1b4c facebook::react::ShadowTreeRegistry::visit(int, std::__1::function<void (facebook::react::ShadowTree const&)> const&) const + 248
33  closeyourtab.debug.dylib              0x107b36a18 reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&) + 1412 (ReanimatedModuleProxy.cpp:1166)
34  closeyourtab.debug.dylib              0x107b360a4 reanimated::ReanimatedModuleProxy::performOperations() + 1032 (ReanimatedModuleProxy.cpp:1117)
35  closeyourtab.debug.dylib              0x107b14a78 invocation function for block in reanimated::createReanimatedModuleProxy(REANodesManager*, RCTModuleRegistry*, facebook::jsi::Runtime&, std::__1::shared_ptr<facebook::react::CallInvoker> const&, WorkletsModule*) + 64 (NativeProxy.mm:49)
36  closeyourtab.debug.dylib              0x107b77304 -[REANodesManager performOperations] + 320 (REANodesManager.mm:126)
37  closeyourtab.debug.dylib              0x107b770bc -[REANodesManager onAnimationFrame:] + 832 (REANodesManager.mm:115)
38  QuartzCore                            0x18c5d0bd4 CA::Display::DisplayLinkItem::dispatch_(CA::SignPost::Interval<(CA::SignPost::CAEventCode)835322056>&) + 56
39  QuartzCore                            0x18c5cc60c CA::Display::DisplayLink::dispatch_items(unsigned long long, unsigned long long, unsigned long long) + 816
40  QuartzCore                            0x18c5d3cb4 CA::Display::DisplayLink::dispatch_deferred_display_links(unsigned int) + 336
41  UIKitCore                             0x1857f8634 _UIUpdateSequenceRunNext + 120
42  UIKitCore                             0x18622ac24 schedulerStepScheduledMainSectionContinue + 56
43  UpdateCycle                           0x24ffc62b4 UC::DriverCore::continueProcessing() + 80
44  CoreFoundation                        0x18041a4ac__CFMachPortPerform + 164
45  CoreFoundation                        0x180456aa8 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__ + 56
46  CoreFoundation                        0x1804560c0 __CFRunLoopDoSource1 + 480
47  CoreFoundation                        0x180455188__CFRunLoopRun + 2100
48  CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
49  GraphicsServices                      0x1926be9bc GSEventRunModal + 116
50  UIKitCore                             0x18630f0d8 -[UIApplication _run] + 772
51  UIKitCore                             0x186313300 UIApplicationMain + 124
52  closeyourtab.debug.dylib              0x107648d08 __debug_main_executable_dylib_entry_point + 64 (AppDelegate.swift:6)
53  ???                                   0x104b893d0 ???
54  dyld                                  0x104e68d54 start + 7184

Thread 0 Crashed::  Dispatch queue: com.apple.main-thread
0   libsystem_kernel.dylib                0x104d9885c __pthread_kill + 8
1   libsystem_pthread.dylib               0x104af62a8 pthread_kill + 264
2   libsystem_c.dylib                     0x1801b5994 abort + 100
3   libc++abi.dylib                       0x18030326c__abort_message + 128
4   libc++abi.dylib                       0x1802f31a4 demangling_terminate_handler() + 268
5   libobjc.A.dylib                       0x180077218 _objc_terminate() + 124
6   libc++abi.dylib                       0x180302758 std::__terminate(void (_)()) + 12
7   libc++abi.dylib                       0x1803057c0 __cxxabiv1::failed_throw(__cxxabiv1::__cxa_exception_) + 32
8   libc++abi.dylib                       0x1803057a0__cxa_throw + 88
9   libobjc.A.dylib                       0x18009c1cc objc_exception_throw + 384
10  QuartzCore                            0x18c5cc8a4 CA::Display::DisplayLink::dispatch_items(unsigned long long, unsigned long long, unsigned long long) + 1480
11  QuartzCore                            0x18c5d3cb4 CA::Display::DisplayLink::dispatch_deferred_display_links(unsigned int) + 336
12  UIKitCore                             0x1857f8634_UIUpdateSequenceRunNext + 120
13  UIKitCore                             0x18622ac24 schedulerStepScheduledMainSectionContinue + 56
14  UpdateCycle                           0x24ffc62b4 UC::DriverCore::continueProcessing() + 80
15  CoreFoundation                        0x18041a4ac__CFMachPortPerform + 164
16  CoreFoundation                        0x180456aa8 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__ + 56
17  CoreFoundation                        0x1804560c0__CFRunLoopDoSource1 + 480
18  CoreFoundation                        0x180455188__CFRunLoopRun + 2100
19  CoreFoundation                        0x18044fcec _CFRunLoopRunSpecificWithOptions + 496
20  GraphicsServices                      0x1926be9bc GSEventRunModal + 116
21  UIKitCore                             0x18630f0d8 -[UIApplication_run] + 772
22  UIKitCore                             0x186313300 UIApplicationMain + 124
23  closeyourtab.debug.dylib              0x107648d08__debug_main_executable_dylib_entry_point + 64 (AppDelegate.swift:6)
24  ???                                   0x104b893d0 ???
25  dyld                                  0x104e68d54 start + 7184

Thread 1:: com.apple.uikit.eventfetch-thread
0   libsystem_kernel.dylib                0x104d90b70 mach_msg2_trap + 8
1   libsystem_kernel.dylib                0x104da190c mach_msg2_internal + 72
2   libsystem_kernel.dylib                0x104d98c10 mach_msg_overwrite + 480
3   libsystem_kernel.dylib                0x104d90ee4 mach_msg + 20
4   CoreFoundation                        0x180455c04 __CFRunLoopServiceMachPort + 156
5   CoreFoundation                        0x180454dbc__CFRunLoopRun + 1128
6   CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
7   Foundation                            0x1810e5408 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8   Foundation                            0x1810e5628 -[NSRunLoop(NSRunLoop) runUntilDate:] + 60
9   UIKitCore                             0x186067690 -[UIEventFetcher threadMain] + 392
10  Foundation                            0x18110c2d4 __NSThread__start__ + 716
11  libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
12  libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 2:: com.facebook.SocketRocket.NetworkThread
0   libsystem_kernel.dylib                0x104d90b70 mach_msg2_trap + 8
1   libsystem_kernel.dylib                0x104da190c mach_msg2_internal + 72
2   libsystem_kernel.dylib                0x104d98c10 mach_msg_overwrite + 480
3   libsystem_kernel.dylib                0x104d90ee4 mach_msg + 20
4   CoreFoundation                        0x180455c04 __CFRunLoopServiceMachPort + 156
5   CoreFoundation                        0x180454dbc__CFRunLoopRun + 1128
6   CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
7   Foundation                            0x1810e5408 -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8   ReactNativeDependencies               0x10537dc10 -[SRRunLoopThread main] + 260
9   Foundation                            0x18110c2d4 __NSThread__start__ + 716
10  libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
11  libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 3:: com.apple.NSURLConnectionLoader
0   libsystem_kernel.dylib                0x104d90b70 mach_msg2_trap + 8
1   libsystem_kernel.dylib                0x104da190c mach_msg2_internal + 72
2   libsystem_kernel.dylib                0x104d98c10 mach_msg_overwrite + 480
3   libsystem_kernel.dylib                0x104d90ee4 mach_msg + 20
4   CoreFoundation                        0x180455c04 __CFRunLoopServiceMachPort + 156
5   CoreFoundation                        0x180454dbc__CFRunLoopRun + 1128
6   CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
7   CFNetwork                             0x184e9dc70 +[__CFN_CoreSchedulingSetRunnable_run:] + 368
8   Foundation                            0x18110c2d4 __NSThread__start__ + 716
9   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
10  libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 4:: com.apple.CFSocket.private
0   libsystem_kernel.dylib                0x104d9af80 __select + 8
1   CoreFoundation                        0x1804648ac__CFSocketManager + 680
2   libsystem_pthread.dylib               0x104af65ac _pthread_start + 104
3   libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 5:: com.apple.CFNetwork.CustomProtocols
0   libsystem_kernel.dylib                0x104d90b70 mach_msg2_trap + 8
1   libsystem_kernel.dylib                0x104da190c mach_msg2_internal + 72
2   libsystem_kernel.dylib                0x104d98c10 mach_msg_overwrite + 480
3   libsystem_kernel.dylib                0x104d90ee4 mach_msg + 20
4   CoreFoundation                        0x180455c04 __CFRunLoopServiceMachPort + 156
5   CoreFoundation                        0x180454dbc__CFRunLoopRun + 1128
6   CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
7   CFNetwork                             0x184e9dc70 +[__CFN_CoreSchedulingSetRunnable_run:] + 368
8   Foundation                            0x18110c2d4 __NSThread__start__ + 716
9   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
10  libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 6:: com.apple.CFStream.LegacyThread
0   libsystem_kernel.dylib                0x104d90b70 mach_msg2_trap + 8
1   libsystem_kernel.dylib                0x104da190c mach_msg2_internal + 72
2   libsystem_kernel.dylib                0x104d98c10 mach_msg_overwrite + 480
3   libsystem_kernel.dylib                0x104d90ee4 mach_msg + 20
4   CoreFoundation                        0x180455c04 __CFRunLoopServiceMachPort + 156
5   CoreFoundation                        0x180454dbc__CFRunLoopRun + 1128
6   CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
7   CoreFoundation                        0x180474184 _legacyStreamRunLoop_workThread + 260
8   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
9   libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 7:: com.apple.UIKit.inProcessAnimationManager
0   libsystem_kernel.dylib                0x104d90aec semaphore_wait_trap + 8
1   libdispatch.dylib                     0x1801c2258_dispatch_sema4_wait + 24
2   libdispatch.dylib                     0x1801c27e0 _dispatch_semaphore_wait_slow + 128
3   UIKitCore                             0x18562b00c 0x18516f000 + 4964364
4   UIKitCore                             0x18562f4d4 0x18516f000 + 4981972
5   UIKitCore                             0x1852c76b4 0x18516f000 + 1410740
6   Foundation                            0x18110c2d4 __NSThread__start__ + 716
7   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
8   libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 8:: com.facebook.react.runtime.JavaScript
0   libsystem_kernel.dylib                0x104d90b70 mach_msg2_trap + 8
1   libsystem_kernel.dylib                0x104da190c mach_msg2_internal + 72
2   libsystem_kernel.dylib                0x104d98c10 mach_msg_overwrite + 480
3   libsystem_kernel.dylib                0x104d90ee4 mach_msg + 20
4   CoreFoundation                        0x180455c04 __CFRunLoopServiceMachPort + 156
5   CoreFoundation                        0x180454dbc__CFRunLoopRun + 1128
6   CoreFoundation                        0x18044fcec_CFRunLoopRunSpecificWithOptions + 496
7   React                                 0x10dc74508 +[RCTJSThreadManager runRunLoop] + 292
8   Foundation                            0x18110c2d4 __NSThread__start__ + 716
9   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
10  libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 9:: hades
0   libsystem_kernel.dylib                0x104d94020 __psynch_cvwait + 8
1   libsystem_pthread.dylib               0x104af6a74_pthread_cond_wait + 976
2   libc++.1.dylib                        0x18033570c std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 28
3   hermes                                0x105ef70dc hermes::vm::HadesGC::Executor::worker() + 112
4   hermes                                0x105ef7040 void*std::__1::__thread_proxy[abi:nn180100]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
6   libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 10:: hades
0   libsystem_kernel.dylib                0x104d94020 __psynch_cvwait + 8
1   libsystem_pthread.dylib               0x104af6a74_pthread_cond_wait + 976
2   libc++.1.dylib                        0x18033570c std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 28
3   hermes                                0x105ef70dc hermes::vm::HadesGC::Executor::worker() + 112
4   hermes                                0x105ef7040 void*std::__1::__thread_proxy[abi:nn180100]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib               0x104af65ac_pthread_start + 104
6   libsystem_pthread.dylib               0x104af1998 thread_start + 8

Thread 11:

Thread 12:

Thread 13:

Thread 14:

Thread 15:

Thread 16:

Thread 17:

Thread 0 crashed with ARM Thread State (64-bit):
    x0: 0x0000000000000000   x1: 0x0000000000000000   x2: 0x0000000000000000   x3: 0x0000000000000000
    x4: 0x0000000180306cab   x5: 0x000000016b322b60   x6: 0x000000000000006e   x7: 0x0000000000000403
    x8: 0x0000000104f0de40   x9: 0x6803e3884954f7cd  x10: 0x0000000000000002  x11: 0x0000010000000000
   x12: 0x00000000fffffffd  x13: 0x0000000000000000  x14: 0x0000000000000000  x15: 0x0000000000000000
   x16: 0x0000000000000148  x17: 0x0000000000000002  x18: 0x0000000000000000  x19: 0x0000000000000006
   x20: 0x0000000000000103  x21: 0x0000000104f0df20  x22: 0x00000001f2d7c000  x23: 0x0000000000000000
   x24: 0x000000016b323c40  x25: 0x0000000105097600  x26: 0x000000010681ec00  x27: 0x0000000000000204
   x28: 0x0000600000f7a400   fp: 0x000000016b322ad0   lr: 0x0000000104af62a8
    sp: 0x000000016b322ab0   pc: 0x0000000104d9885c cpsr: 0x40000000
   far: 0x0000000000000000  esr: 0x56000080 (Syscall)

Binary Images:
       0x104e60000 -        0x104efffff dyld (_) <b50f5a1a-be81-3068-92e1-3554f2be478a> /usr/lib/dyld
       0x104ad8000 -        0x104adbfff com.peacockerystudio.closeyourtab (1.0.0) <a9ee95aa-2d16-3361-be48-6f3efcd85e2d> /Users/USER/Library/Developer/CoreSimulator/Devices/13B9FB16-6113-408A-AD8A-A155750309D9/data/Containers/Bundle/Application/A5D7C373-750A-40A4-BE87-A5FC64D28CE5/closeyourtab.app/closeyourtab
       0x107644000 -        0x1082c3fff closeyourtab.debug.dylib (_) <8cd7a582-227c-3e31-92f7-b8f6324828d5> /Users/USER/Library/Developer/CoreSimulator/Devices/13B9FB16-6113-408A-AD8A-A155750309D9/data/Containers/Bundle/Application/A5D7C373-750A-40A4-BE87-A5FC64D28CE5/closeyourtab.app/closeyourtab.debug.dylib
       0x10d1d0000 -        0x10dfe3fff react-native.React (1.0) <ac487519-d12b-3ed8-b013-5010ec9bc032> /Users/USER/Library/Developer/CoreSimulator/Devices/13B9FB16-6113-408A-AD8A-A155750309D9/data/Containers/Bundle/Application/A5D7C373-750A-40A4-BE87-A5FC64D28CE5/closeyourtab.app/Frameworks/React.framework/React
       0x105324000 -        0x10548bfff third-party.ReactNativeDependencies (1.0) <1c45f8d4-664a-3470-8fd0-341a04b1a28c> /Users/USER/Library/Developer/CoreSimulator/Devices/13B9FB16-6113-408A-AD8A-A155750309D9/data/Containers/Bundle/Application/A5D7C373-750A-40A4-BE87-A5FC64D28CE5/closeyourtab.app/Frameworks/ReactNativeDependencies.framework/ReactNativeDependencies
       0x105d44000 -        0x1060cbfff dev.hermesengine.iphonesimulator (0.12.0) <944bd49b-ad2e-3e3c-96ac-0603909fdd97> /Users/USER/Library/Developer/CoreSimulator/Devices/13B9FB16-6113-408A-AD8A-A155750309D9/data/Containers/Bundle/Application/A5D7C373-750A-40A4-BE87-A5FC64D28CE5/closeyourtab.app/Frameworks/hermes.framework/hermes
       0x104b54000 -        0x104b5bfff libsystem_platform.dylib (_) <af547fd5-445c-3167-911e-194532cf1f08> /usr/lib/system/libsystem_platform.dylib
       0x104d90000 -        0x104dcbfff libsystem_kernel.dylib (_) <545f62d1-ac22-3ce8-a7d6-53b08a143e8e> /usr/lib/system/libsystem_kernel.dylib
       0x104af0000 -        0x104afffff libsystem_pthread.dylib (_) <24a6e967-2095-367a-a315-dcdf05eef42e> /usr/lib/system/libsystem_pthread.dylib
       0x104e3c000 -        0x104e47fff libobjc-trampolines.dylib (_) <f766081e-2450-3187-beb3-a18b5d825986> /Volumes/VOLUME/_/libobjc-trampolines.dylib
       0x180141000 -        0x1801be2c3 libsystem_c.dylib (_) <4be317ce-e19b-36b1-809a-b1fbf17587a8> /Volumes/VOLUME/_/libsystem_c.dylib
       0x1802f2000 -        0x18030a56f libc++abi.dylib (_) <854f9986-f066-3a26-8bd7-4c14dd25f58e> /Volumes/VOLUME/_/libc++abi.dylib
       0x180070000 -        0x1800ad297 libobjc.A.dylib (_) <bb867be3-83c2-3d97-84ef-4661b648229c> /Volumes/VOLUME/_/libobjc.A.dylib
       0x18c5b8000 -        0x18c8e5cdf com.apple.QuartzCore (1193.39.9) <1c6bd7be-1cbb-3828-afc8-190bdf09dfcf> /Volumes/VOLUME/_/QuartzCore.framework/QuartzCore
       0x18516f000 -        0x1873836bf com.apple.UIKitCore (1.0) <55f9ab77-06fb-3839-9083-ddbf2b2608be> /Volumes/VOLUME/_/UIKitCore.framework/UIKitCore
       0x24ffc5000 -        0x24ffc6e9f com.apple.UpdateCycle (1) <2f470b4d-48c2-369f-9905-7e01b9606cc4> /Volumes/VOLUME/_/UpdateCycle.framework/UpdateCycle
       0x1803c3000 -        0x1807df37f com.apple.CoreFoundation (6.9) <1ce7a90d-1134-3bfe-b564-88755edd6c85> /Volumes/VOLUME/_/CoreFoundation.framework/CoreFoundation
       0x1926bc000 -        0x1926c3dbf com.apple.GraphicsServices (1.0) <4150c740-636d-3fba-a5f1-3e1483221156> /Volumes/VOLUME/_/GraphicsServices.framework/GraphicsServices
               0x0 - 0xffffffffffffffff ??? (_) <00000000-0000-0000-0000-000000000000> ???
       0x18085f000 -        0x1815aad7f com.apple.Foundation (6.9) <249188a3-8f44-3d76-acb0-0345a43eb0a3> /Volumes/VOLUME/_/Foundation.framework/Foundation
       0x184c9d000 -        0x18500f13f com.apple.CFNetwork (1.0) <e8f01728-c4af-3b4f-b340-af39876bf31d> /Volumes/VOLUME/_/CFNetwork.framework/CFNetwork
       0x1801bf000 -        0x1802041bf libdispatch.dylib (_) <da1dd2f7-9f16-387c-9c54-fe18cccb12d9> /Volumes/VOLUME/_/libdispatch.dylib
       0x180314000 -        0x18039d4df libc++.1.dylib (_) <a7d32f85-302a-33da-a8c5-5b94a8e2c838> /Volumes/VOLUME/*/libc++.1.dylib

External Modification Summary:
  Calls made by other processes targeting this process:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0
  Calls made by this process:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0
  Calls made by all processes on this machine:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0

VM Region Summary:
ReadOnly portion of Libraries: Total=1.8G resident=0K(0%) swapped_out_or_unallocated=1.8G(100%)
Writable regions: Total=1.8G written=3476K(0%) resident=2852K(0%) swapped_out=624K(0%) unallocated=1.8G(100%)

                                VIRTUAL   REGION 
REGION TYPE                        SIZE    COUNT (non-coalesced)
===========                     =======  =======
Accelerate framework               128K        1
Activity Tracing                   256K        1
AttributeGraph Data               1024K        1
CG raster data                    2880K       88
ColorSync                           16K        1
CoreAnimation                     35.0M      101
Foundation                          16K        1
IOSurface                         34.4M        4
Image IO                          4512K        8
Kernel Alloc Once                   32K        1
MALLOC                             1.6G      393
MALLOC guard page                  576K       36
SQLite page cache                  384K        3
STACK GUARD                       56.3M       18
Stack                             17.5M       18
VM_ALLOCATE                       75.2M     1040
__DATA                            46.6M      934
__DATA_CONST                     112.4M      961
__DATA_DIRTY                       139K       13
__FONT_DATA                        2352        1
__LINKEDIT                       775.7M       11
__OBJC_RO                         62.6M        1
__OBJC_RW                         2773K        1
__TEXT                             1.1G      975
__TPRO_CONST                       148K        2
dyld private memory                2.2G       78
mapped file                      254.3M       54
page table in kernel              2852K        1
shared memory                       16K        1
===========                     =======  =======
TOTAL                              6.3G     4748

-----------

Full Report
-----------

{"app_name":"closeyourtab","timestamp":"2025-12-01 23:40:06.00 -0700","app_version":"1.0.0","slice_uuid":"a9ee95aa-2d16-3361-be48-6f3efcd85e2d","build_version":"1","platform":7,"bundleID":"com.peacockerystudio.closeyourtab","share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"macOS 26.1 (25B78)","roots_installed":0,"name":"closeyourtab","incident_id":"809C4C94-24DA-46A3-8222-0CE7A3C11464"}
{
  "uptime" : 440000,
  "procRole" : "Foreground",
  "version" : 2,
  "userID" : 501,
  "deployVersion" : 210,
  "modelCode" : "Mac16,12",
  "coalitionID" : 11555,
  "osVersion" : {
    "train" : "macOS 26.1",
    "build" : "25B78",
    "releaseType" : "User"
  },
  "captureTime" : "2025-12-01 23:40:01.7447 -0700",
  "codeSigningMonitor" : 2,
  "incident" : "809C4C94-24DA-46A3-8222-0CE7A3C11464",
  "pid" : 65503,
  "translated" : false,
  "cpuType" : "ARM-64",
  "roots_installed" : 0,
  "bug_type" : "309",
  "procLaunch" : "2025-12-01 17:20:28.8733 -0700",
  "procStartAbsTime" : 10203653772206,
  "procExitAbsTime" : 10575716502939,
  "procName" : "closeyourtab",
  "procPath" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/13B9FB16-6113-408A-AD8A-A155750309D9\/data\/Containers\/Bundle\/Application\/A5D7C373-750A-40A4-BE87-A5FC64D28CE5\/closeyourtab.app\/closeyourtab",
  "bundleInfo" : {"CFBundleShortVersionString":"1.0.0","CFBundleVersion":"1","CFBundleIdentifier":"com.peacockerystudio.closeyourtab"},
  "storeInfo" : {"deviceIdentifierForVendor":"E60B0398-31B6-5F8A-8370-5ABF152687A8","thirdParty":true},
  "parentProc" : "launchd_sim",
  "parentPid" : 40137,
  "coalitionName" : "com.apple.CoreSimulator.SimDevice.13B9FB16-6113-408A-AD8A-A155750309D9",
  "crashReporterKey" : "981B5D7E-3D27-315C-9DC1-A2E05AA64425",
  "appleIntelligenceStatus" : {"state":"unavailable","reasons":["siriAssetIsNotReady","assetIsNotReady","notOptedIn"]},
  "developerMode" : 1,
  "responsiblePid" : 27903,
  "responsibleProc" : "SimulatorTrampoline",
  "codeSigningID" : "com.peacockerystudio.closeyourtab",
  "codeSigningTeamID" : "",
  "codeSigningFlags" : 570425857,
  "codeSigningValidationCategory" : 10,
  "codeSigningTrustLevel" : 4294967295,
  "codeSigningAuxiliaryInfo" : 0,
  "instructionByteStream" : {"beforePC":"4wAAVP17v6n9AwCRKeP\/l78DAJH9e8GowANf1sADX9YQKYDSARAA1A==","atPC":"4wAAVP17v6n9AwCRH+P\/l78DAJH9e8GowANf1sADX9ZwCoDSARAA1A=="},
  "bootSessionUUID" : "5E5CC109-6A65-49E5-B46A-FEEC5E5884EE",
  "wakeTime" : 1951,
  "sleepWakeUUID" : "EEA19AB1-6269-4921-8CC2-2AE2D02EF5D8",
  "sip" : "enabled",
  "exception" : {"codes":"0x0000000000000000, 0x0000000000000000","rawCodes":[0,0],"type":"EXC_CRASH","signal":"SIGABRT"},
  "termination" : {"flags":0,"code":6,"namespace":"SIGNAL","indicator":"Abort trap: 6","byProc":"closeyourtab","byPid":65503},
  "extMods" : {"caller":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"system":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"targeted":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"warnings":0},
  "lastExceptionBacktrace" : [{"imageOffset":1262020,"symbol":"__exceptionPreprocess","symbolLocation":160,"imageIndex":16},{"imageOffset":180372,"symbol":"objc_exception_throw","symbolLocation":72,"imageIndex":12},{"imageOffset":74480,"symbol":"-[__NSArrayM insertObject:atIndex:]","symbolLocation":1584,"imageIndex":16},{"imageOffset":11066408,"sourceLine":138,"sourceFile":"AIRMap.m","symbol":"-[AIRMap insertReactSubview:atIndex:]","imageIndex":2,"symbolLocation":888},{"imageOffset":7599856,"symbol":"-[RCTLegacyViewManagerInteropComponentView finalizeUpdates:]","symbolLocation":1312,"imageIndex":3},{"imageOffset":8478152,"symbol":"RCTPerformMountInstructions(std::__1::vector<facebook::react::ShadowViewMutation, std::__1::allocator<facebook::react::ShadowViewMutation>> const&, RCTComponentViewRegistry*, RCTMountingTransactionObserverCoordinator&, int)","symbolLocation":2060,"imageIndex":3},{"imageOffset":8476080,"symbol":"-[RCTMountingManager performTransaction:]::$_1::operator()(facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) const","symbolLocation":80,"imageIndex":3},{"imageOffset":8475988,"symbol":"decltype(std::declval<-[RCTMountingManager performTransaction:]::$_1&>()(std::declval<facebook::react::MountingTransaction const&>(), std::declval<facebook::react::SurfaceTelemetry const&>())) std::__1::__invoke[abi:de180100]<-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&>(-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)","symbolLocation":40,"imageIndex":3},{"imageOffset":8475900,"symbol":"void std::__1::__invoke_void_return_wrapper<void, true>::__call[abi:de180100]<-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&>(-[RCTMountingManager performTransaction:]::$_1&, facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)","symbolLocation":40,"imageIndex":3},{"imageOffset":8475848,"symbol":"std::__1::__function::__alloc_func<-[RCTMountingManager performTransaction:]::$_1, std::__1::allocator<-[RCTMountingManager performTransaction:]::$_1>, void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()[abi:de180100](facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)","symbolLocation":44,"imageIndex":3},{"imageOffset":8471364,"symbol":"std::__1::__function::__func<-[RCTMountingManager performTransaction:]::$_1, std::__1::allocator<-[RCTMountingManager performTransaction:]::$_1>, void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()(facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)","symbolLocation":44,"imageIndex":3},{"imageOffset":6411916,"symbol":"std::__1::__function::__value_func<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()[abi:de180100](facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) const","symbolLocation":84,"imageIndex":3},{"imageOffset":6404992,"symbol":"std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)>::operator()(facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&) const","symbolLocation":40,"imageIndex":3},{"imageOffset":6404528,"symbol":"facebook::react::TelemetryController::pullTransaction(std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)> const&, std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)> const&, std::__1::function<void (facebook::react::MountingTransaction const&, facebook::react::SurfaceTelemetry const&)> const&) const","symbolLocation":300,"imageIndex":3},{"imageOffset":8438200,"symbol":"-[RCTMountingManager performTransaction:]","symbolLocation":564,"imageIndex":3},{"imageOffset":8437460,"symbol":"-[RCTMountingManager initiateTransaction:]","symbolLocation":428,"imageIndex":3},{"imageOffset":8435052,"symbol":"-[RCTMountingManager scheduleTransaction:]","symbolLocation":72,"imageIndex":3},{"imageOffset":8588536,"symbol":"-[RCTSurfacePresenter schedulerShouldRenderTransactions:]","symbolLocation":76,"imageIndex":3},{"imageOffset":8520360,"symbol":"SchedulerDelegateProxy::schedulerShouldRenderTransactions(std::__1::shared_ptr<facebook::react::MountingCoordinator const> const&)","symbolLocation":104,"imageIndex":3},{"imageOffset":6562776,"symbol":"facebook::react::Scheduler::uiManagerDidFinishTransaction(std::__1::shared_ptr<facebook::react::MountingCoordinator const>, bool)","symbolLocation":364,"imageIndex":3},{"imageOffset":6878828,"symbol":"facebook::react::UIManager::shadowTreeDidFinishTransaction(std::__1::shared_ptr<facebook::react::MountingCoordinator const>, bool) const","symbolLocation":140,"imageIndex":3},{"imageOffset":6317532,"symbol":"facebook::react::ShadowTree::mount(facebook::react::ShadowTreeRevision, bool) const","symbolLocation":168,"imageIndex":3},{"imageOffset":6319764,"symbol":"facebook::react::ShadowTree::tryCommit(std::__1::function<std::__1::shared_ptr<facebook::react::RootShadowNode> (facebook::react::RootShadowNode const&)> const&, facebook::react::ShadowTreeCommitOptions const&) const","symbolLocation":1212,"imageIndex":3},{"imageOffset":6318280,"symbol":"facebook::react::ShadowTree::commit(std::__1::function<std::__1::shared_ptr<facebook::react::RootShadowNode> (facebook::react::RootShadowNode const&)> const&, facebook::react::ShadowTreeCommitOptions const&) const","symbolLocation":256,"imageIndex":3},{"imageOffset":5394276,"sourceLine":1167,"sourceFile":"ReanimatedModuleProxy.cpp","symbol":"reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0::operator()(facebook::react::ShadowTree const&) const","imageIndex":2,"symbolLocation":116},{"imageOffset":5394148,"sourceLine":179,"sourceFile":"invoke.h","symbol":"decltype(std::declval<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&>()(std::declval<facebook::react::ShadowTree const&>())) std::__1::__invoke[abi:de200100]<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&>(reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&)","imageIndex":2,"symbolLocation":32},{"imageOffset":5394104,"sourceLine":252,"sourceFile":"invoke.h","symbol":"void std::__1::__invoke_void_return_wrapper<void, true>::__call[abi:de200100]<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&>(reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&)","imageIndex":2,"symbolLocation":32},{"imageOffset":5394060,"sourceLine":273,"sourceFile":"invoke.h","symbol":"void std::__1::__invoke_r[abi:de200100]<void, reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&>(reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0&, facebook::react::ShadowTree const&)","imageIndex":2,"symbolLocation":32},{"imageOffset":5394016,"sourceLine":167,"sourceFile":"function.h","symbol":"std::__1::__function::__alloc_func<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0, std::__1::allocator<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0>, void (facebook::react::ShadowTree const&)>::operator()[abi:de200100](facebook::react::ShadowTree const&)","imageIndex":2,"symbolLocation":32},{"imageOffset":5392032,"sourceLine":319,"sourceFile":"function.h","symbol":"std::__1::__function::__func<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0, std::__1::allocator<reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)::$_0>, void (facebook::react::ShadowTree const&)>::operator()(facebook::react::ShadowTree const&)","imageIndex":2,"symbolLocation":36},{"imageOffset":6375856,"symbol":"std::__1::__function::__value_func<void (facebook::react::ShadowTree const&)>::operator()[abi:de180100](facebook::react::ShadowTree const&) const","symbolLocation":76,"imageIndex":3},{"imageOffset":6364076,"symbol":"std::__1::function<void (facebook::react::ShadowTree const&)>::operator()(facebook::react::ShadowTree const&) const","symbolLocation":32,"imageIndex":3},{"imageOffset":6363980,"symbol":"facebook::react::ShadowTreeRegistry::visit(int, std::__1::function<void (facebook::react::ShadowTree const&)> const&) const","symbolLocation":248,"imageIndex":3},{"imageOffset":5188120,"sourceLine":1166,"sourceFile":"ReanimatedModuleProxy.cpp","symbol":"reanimated::ReanimatedModuleProxy::commitUpdates(facebook::jsi::Runtime&, std::__1::vector<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>, std::__1::allocator<std::__1::pair<std::__1::shared_ptr<facebook::react::ShadowNode const>, folly::dynamic>>> const&)","imageIndex":2,"symbolLocation":1412},{"imageOffset":5185700,"sourceLine":1117,"sourceFile":"ReanimatedModuleProxy.cpp","symbol":"reanimated::ReanimatedModuleProxy::performOperations()","imageIndex":2,"symbolLocation":1032},{"imageOffset":5048952,"sourceLine":49,"sourceFile":"NativeProxy.mm","symbol":"invocation function for block in reanimated::createReanimatedModuleProxy(REANodesManager*, RCTModuleRegistry*, facebook::jsi::Runtime&, std::__1::shared_ptr<facebook::react::CallInvoker> const&, WorkletsModule*)","imageIndex":2,"symbolLocation":64},{"imageOffset":5452548,"sourceLine":126,"sourceFile":"REANodesManager.mm","symbol":"-[REANodesManager performOperations]","imageIndex":2,"symbolLocation":320},{"imageOffset":5451964,"sourceLine":115,"sourceFile":"REANodesManager.mm","symbol":"-[REANodesManager onAnimationFrame:]","imageIndex":2,"symbolLocation":832},{"imageOffset":101332,"symbol":"CA::Display::DisplayLinkItem::dispatch_(CA::SignPost::Interval<(CA::SignPost::CAEventCode)835322056>&)","symbolLocation":56,"imageIndex":13},{"imageOffset":83468,"symbol":"CA::Display::DisplayLink::dispatch_items(unsigned long long, unsigned long long, unsigned long long)","symbolLocation":816,"imageIndex":13},{"imageOffset":113844,"symbol":"CA::Display::DisplayLink::dispatch_deferred_display_links(unsigned int)","symbolLocation":336,"imageIndex":13},{"imageOffset":6854196,"symbol":"_UIUpdateSequenceRunNext","symbolLocation":120,"imageIndex":14},{"imageOffset":17546276,"symbol":"schedulerStepScheduledMainSectionContinue","symbolLocation":56,"imageIndex":14},{"imageOffset":4788,"symbol":"UC::DriverCore::continueProcessing()","symbolLocation":80,"imageIndex":15},{"imageOffset":357548,"symbol":"__CFMachPortPerform","symbolLocation":164,"imageIndex":16},{"imageOffset":604840,"symbol":"__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__","symbolLocation":56,"imageIndex":16},{"imageOffset":602304,"symbol":"__CFRunLoopDoSource1","symbolLocation":480,"imageIndex":16},{"imageOffset":598408,"symbol":"__CFRunLoopRun","symbolLocation":2100,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":10684,"symbol":"GSEventRunModal","symbolLocation":116,"imageIndex":17},{"imageOffset":18481368,"symbol":"-[UIApplication _run]","symbolLocation":772,"imageIndex":14},{"imageOffset":18498304,"symbol":"UIApplicationMain","symbolLocation":124,"imageIndex":14},{"imageOffset":19720,"sourceLine":6,"sourceFile":"AppDelegate.swift","symbol":"__debug_main_executable_dylib_entry_point","imageIndex":2,"symbolLocation":64},{"imageOffset":4374172624,"imageIndex":18},{"imageOffset":36180,"symbol":"start","symbolLocation":7184,"imageIndex":0}],
  "faultingThread" : 0,
  "threads" : [{"triggered":true,"id":12265433,"threadState":{"x":[{"value":0},{"value":0},{"value":0},{"value":0},{"value":6445624491},{"value":6093417312},{"value":110},{"value":1027},{"value":4377861696,"symbolLocation":0,"symbol":"_main_thread"},{"value":7495084379359999949},{"value":2},{"value":1099511627776},{"value":4294967293},{"value":0},{"value":0},{"value":0},{"value":328},{"value":2},{"value":0},{"value":6},{"value":259},{"value":4377861920,"symbolLocation":224,"symbol":"_main_thread"},{"value":8369192960,"symbolLocation":64,"symbol":"objc_debug_taggedpointer_ext_classes"},{"value":0},{"value":6093421632},{"value":4379473408},{"value":4404145152},{"value":516},{"value":105553132495872}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4373570216},"cpsr":{"value":1073741824},"fp":{"value":6093417168},"sp":{"value":6093417136},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376332380,"matchesCrashFrame":1},"far":{"value":0}},"queue":"com.apple.main-thread","frames":[{"imageOffset":34908,"symbol":"__pthread_kill","symbolLocation":8,"imageIndex":7},{"imageOffset":25256,"symbol":"pthread_kill","symbolLocation":264,"imageIndex":8},{"imageOffset":477588,"symbol":"abort","symbolLocation":100,"imageIndex":10},{"imageOffset":70252,"symbol":"__abort_message","symbolLocation":128,"imageIndex":11},{"imageOffset":4516,"symbol":"demangling_terminate_handler()","symbolLocation":268,"imageIndex":11},{"imageOffset":29208,"symbol":"_objc_terminate()","symbolLocation":124,"imageIndex":12},{"imageOffset":67416,"symbol":"std::__terminate(void (_)())","symbolLocation":12,"imageIndex":11},{"imageOffset":79808,"symbol":"__cxxabiv1::failed_throw(__cxxabiv1::__cxa_exception_)","symbolLocation":32,"imageIndex":11},{"imageOffset":79776,"symbol":"__cxa_throw","symbolLocation":88,"imageIndex":11},{"imageOffset":180684,"symbol":"objc_exception_throw","symbolLocation":384,"imageIndex":12},{"imageOffset":84132,"symbol":"CA::Display::DisplayLink::dispatch_items(unsigned long long, unsigned long long, unsigned long long)","symbolLocation":1480,"imageIndex":13},{"imageOffset":113844,"symbol":"CA::Display::DisplayLink::dispatch_deferred_display_links(unsigned int)","symbolLocation":336,"imageIndex":13},{"imageOffset":6854196,"symbol":"_UIUpdateSequenceRunNext","symbolLocation":120,"imageIndex":14},{"imageOffset":17546276,"symbol":"schedulerStepScheduledMainSectionContinue","symbolLocation":56,"imageIndex":14},{"imageOffset":4788,"symbol":"UC::DriverCore::continueProcessing()","symbolLocation":80,"imageIndex":15},{"imageOffset":357548,"symbol":"__CFMachPortPerform","symbolLocation":164,"imageIndex":16},{"imageOffset":604840,"symbol":"__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__","symbolLocation":56,"imageIndex":16},{"imageOffset":602304,"symbol":"__CFRunLoopDoSource1","symbolLocation":480,"imageIndex":16},{"imageOffset":598408,"symbol":"__CFRunLoopRun","symbolLocation":2100,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":10684,"symbol":"GSEventRunModal","symbolLocation":116,"imageIndex":17},{"imageOffset":18481368,"symbol":"-[UIApplication _run]","symbolLocation":772,"imageIndex":14},{"imageOffset":18498304,"symbol":"UIApplicationMain","symbolLocation":124,"imageIndex":14},{"imageOffset":19720,"sourceLine":6,"sourceFile":"AppDelegate.swift","symbol":"__debug_main_executable_dylib_entry_point","imageIndex":2,"symbolLocation":64},{"imageOffset":4374172624,"imageIndex":18},{"imageOffset":36180,"symbol":"start","symbolLocation":7184,"imageIndex":0}]},{"id":12265448,"name":"com.apple.uikit.eventfetch-thread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":63784559312896},{"value":0},{"value":63784559312896},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":14851},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":63784559312896},{"value":0},{"value":63784559312896},{"value":6096854408},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4376369420},"cpsr":{"value":0},"fp":{"value":6096854256},"sp":{"value":6096854176},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300400},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":71948,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":7},{"imageOffset":35856,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":7},{"imageOffset":3812,"symbol":"mach_msg","symbolLocation":20,"imageIndex":7},{"imageOffset":601092,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":16},{"imageOffset":597436,"symbol":"__CFRunLoopRun","symbolLocation":1128,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":8938504,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":19},{"imageOffset":8939048,"symbol":"-[NSRunLoop(NSRunLoop) runUntilDate:]","symbolLocation":60,"imageIndex":19},{"imageOffset":15697552,"symbol":"-[UIEventFetcher threadMain]","symbolLocation":392,"imageIndex":14},{"imageOffset":9097940,"symbol":"__NSThread__start__","symbolLocation":716,"imageIndex":19},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":12265451,"name":"com.facebook.SocketRocket.NetworkThread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":134153303490560},{"value":0},{"value":134153303490560},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":31235},{"value":3072},{"value":18446744073709551569},{"value":82463372102402},{"value":0},{"value":4294967295},{"value":2},{"value":134153303490560},{"value":0},{"value":134153303490560},{"value":6098001240},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4376369420},"cpsr":{"value":0},"fp":{"value":6098001088},"sp":{"value":6098001008},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300400},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":71948,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":7},{"imageOffset":35856,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":7},{"imageOffset":3812,"symbol":"mach_msg","symbolLocation":20,"imageIndex":7},{"imageOffset":601092,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":16},{"imageOffset":597436,"symbol":"__CFRunLoopRun","symbolLocation":1128,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":8938504,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":19},{"imageOffset":367632,"symbol":"-[SRRunLoopThread main]","symbolLocation":260,"imageIndex":4},{"imageOffset":9097940,"symbol":"__NSThread__start__","symbolLocation":716,"imageIndex":19},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":12265452,"name":"com.apple.NSURLConnectionLoader","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":129755256979456},{"value":0},{"value":129755256979456},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":30211},{"value":3072},{"value":18446744073709551569},{"value":5497558140162},{"value":0},{"value":4294967295},{"value":2},{"value":129755256979456},{"value":0},{"value":129755256979456},{"value":6098574664},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4376369420},"cpsr":{"value":0},"fp":{"value":6098574512},"sp":{"value":6098574432},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300400},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":71948,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":7},{"imageOffset":35856,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":7},{"imageOffset":3812,"symbol":"mach_msg","symbolLocation":20,"imageIndex":7},{"imageOffset":601092,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":16},{"imageOffset":597436,"symbol":"__CFRunLoopRun","symbolLocation":1128,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":2100336,"symbol":"+[__CFN_CoreSchedulingSetRunnable_run:]","symbolLocation":368,"imageIndex":20},{"imageOffset":9097940,"symbol":"__NSThread__start__","symbolLocation":716,"imageIndex":19},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":12265454,"name":"com.apple.CFSocket.private","threadState":{"x":[{"value":4},{"value":0},{"value":105553116286320},{"value":0},{"value":0},{"value":0},{"value":1379087156224},{"value":0},{"value":6099153120},{"value":0},{"value":5088289888},{"value":31},{"value":14},{"value":5088290096},{"value":72057602407301289,"symbolLocation":72057594037927937,"symbol":"OBJC_CLASS_$___NSCFArray"},{"value":8369373352,"symbolLocation":0,"symbol":"OBJC_CLASS_$___NSCFArray"},{"value":93},{"value":6446906352,"symbolLocation":0,"symbol":"-[__NSCFArray objectAtIndex:]"},{"value":0},{"value":105553129225456},{"value":8369393664,"symbolLocation":48,"symbol":"cache"},{"value":64},{"value":8369396144,"symbolLocation":0,"symbol":"__CFActiveSocketsLock"},{"value":0},{"value":105553116286320},{"value":105553129201056},{"value":105553116286304},{"value":0},{"value":105553129200816}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6447057068},"cpsr":{"value":1610612736},"fp":{"value":6099152832},"sp":{"value":6099119056},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376342400},"far":{"value":0}},"frames":[{"imageOffset":44928,"symbol":"__select","symbolLocation":8,"imageIndex":7},{"imageOffset":661676,"symbol":"__CFSocketManager","symbolLocation":680,"imageIndex":16},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":12265457,"name":"com.apple.CFNetwork.CustomProtocols","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":113296942301184},{"value":0},{"value":113296942301184},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":26379},{"value":3072},{"value":18446744073709551569},{"value":16492674420482},{"value":0},{"value":4294967295},{"value":2},{"value":113296942301184},{"value":0},{"value":113296942301184},{"value":6101392712},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4376369420},"cpsr":{"value":0},"fp":{"value":6101392560},"sp":{"value":6101392480},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300400},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":71948,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":7},{"imageOffset":35856,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":7},{"imageOffset":3812,"symbol":"mach_msg","symbolLocation":20,"imageIndex":7},{"imageOffset":601092,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":16},{"imageOffset":597436,"symbol":"__CFRunLoopRun","symbolLocation":1128,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":2100336,"symbol":"+[__CFN_CoreSchedulingSetRunnable _run:]","symbolLocation":368,"imageIndex":20},{"imageOffset":9097940,"symbol":"__NSThread__start__","symbolLocation":716,"imageIndex":19},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":12265458,"name":"com.apple.CFStream.LegacyThread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":278189326729216},{"value":0},{"value":278189326729216},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":64771},{"value":3072},{"value":18446744073709551569},{"value":244091581423106},{"value":0},{"value":4294967295},{"value":2},{"value":278189326729216},{"value":0},{"value":278189326729216},{"value":6101966856},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4376369420},"cpsr":{"value":0},"fp":{"value":6101966704},"sp":{"value":6101966624},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300400},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":71948,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":7},{"imageOffset":35856,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":7},{"imageOffset":3812,"symbol":"mach_msg","symbolLocation":20,"imageIndex":7},{"imageOffset":601092,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":16},{"imageOffset":597436,"symbol":"__CFRunLoopRun","symbolLocation":1128,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":725380,"symbol":"_legacyStreamRunLoop_workThread","symbolLocation":260,"imageIndex":16},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":12267376,"name":"com.apple.UIKit.inProcessAnimationManager","threadState":{"x":[{"value":14},{"value":18446744073709551615},{"value":1},{"value":1},{"value":17179869187},{"value":3},{"value":17179869187},{"value":3},{"value":37147},{"value":18446744073709551615},{"value":0},{"value":0},{"value":8589934595},{"value":3},{"value":8369181480,"symbolLocation":0,"symbol":"OBJC_CLASS_$_OS_dispatch_semaphore"},{"value":8369181480,"symbolLocation":0,"symbol":"OBJC_CLASS_$_OS_dispatch_semaphore"},{"value":18446744073709551580},{"value":6444291256,"symbolLocation":0,"symbol":"-[OS_object retain]"},{"value":0},{"value":105553152468816},{"value":105553152468752},{"value":18446744073709551615},{"value":4400029424},{"value":8514293760,"objc-selector":""},{"value":8514293760,"objc-selector":""},{"value":105553152468752},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6444294744},"cpsr":{"value":1610612736},"fp":{"value":6103690304},"sp":{"value":6103690288},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300268},"far":{"value":0}},"frames":[{"imageOffset":2796,"symbol":"semaphore_wait_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":12888,"symbol":"_dispatch_sema4_wait","symbolLocation":24,"imageIndex":21},{"imageOffset":14304,"symbol":"_dispatch_semaphore_wait_slow","symbolLocation":128,"imageIndex":21},{"imageOffset":4964364,"imageIndex":14},{"imageOffset":4981972,"imageIndex":14},{"imageOffset":1410740,"imageIndex":14},{"imageOffset":9097940,"symbol":"__NSThread__start__","symbolLocation":716,"imageIndex":19},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":13291511,"name":"com.facebook.react.runtime.JavaScript","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":333817743147008},{"value":0},{"value":333817743147008},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":77723},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":333817743147008},{"value":0},{"value":333817743147008},{"value":6100245832},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4376369420},"cpsr":{"value":0},"fp":{"value":6100245680},"sp":{"value":6100245600},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376300400},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":7},{"imageOffset":71948,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":7},{"imageOffset":35856,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":7},{"imageOffset":3812,"symbol":"mach_msg","symbolLocation":20,"imageIndex":7},{"imageOffset":601092,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":16},{"imageOffset":597436,"symbol":"__CFRunLoopRun","symbolLocation":1128,"imageIndex":16},{"imageOffset":576748,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":496,"imageIndex":16},{"imageOffset":11158792,"symbol":"+[RCTJSThreadManager runRunLoop]","symbolLocation":292,"imageIndex":3},{"imageOffset":9097940,"symbol":"__NSThread__start__","symbolLocation":716,"imageIndex":19},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":13291512,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":2560},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6097432232},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":86861418614786},{"value":0},{"value":105553172221024},{"value":105553172221088},{"value":6097432800},{"value":0},{"value":0},{"value":2560},{"value":2561},{"value":2816},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4373572212},"cpsr":{"value":1610612736},"fp":{"value":6097432352},"sp":{"value":6097432208},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376313888},"far":{"value":0}},"frames":[{"imageOffset":16416,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":7},{"imageOffset":27252,"symbol":"_pthread_cond_wait","symbolLocation":976,"imageIndex":8},{"imageOffset":136972,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":28,"imageIndex":22},{"imageOffset":1781980,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":112,"imageIndex":5},{"imageOffset":1781824,"symbol":"void* std::__1::__thread_proxy[abi:nn180100]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":5},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":13291605,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6102544040},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":0},{"value":0},{"value":105553171983888},{"value":105553171983952},{"value":6102544608},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4373572212},"cpsr":{"value":1610612736},"fp":{"value":6102544160},"sp":{"value":6102544016},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4376313888},"far":{"value":0}},"frames":[{"imageOffset":16416,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":7},{"imageOffset":27252,"symbol":"_pthread_cond_wait","symbolLocation":976,"imageIndex":8},{"imageOffset":136972,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":28,"imageIndex":22},{"imageOffset":1781980,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":112,"imageIndex":5},{"imageOffset":1781824,"symbol":"void* std::__1::__thread_proxy[abi:nn180100]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":5},{"imageOffset":26028,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":8},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":8}]},{"id":13337774,"frames":[],"threadState":{"x":[{"value":6094565376},{"value":125371},{"value":6094028800},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6094565376},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4373551492},"far":{"value":0}}},{"id":13337922,"frames":[],"threadState":{"x":[{"value":6095138816},{"value":33667},{"value":6094602240},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6095138816},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4373551492},"far":{"value":0}}},{"id":13338046,"frames":[],"threadState":{"x":[{"value":6096285696},{"value":9231},{"value":6095749120},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6096285696},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4373551492},"far":{"value":0}}},{"id":13338081,"frames":[],"threadState":{"x":[{"value":6103117824},{"value":99299},{"value":6102581248},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6103117824},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4373551492},"far":{"value":0}}},{"id":13338082,"frames":[],"threadState":{"x":[{"value":6104264704},{"value":91691},{"value":6103728128},{"value":6104263552},{"value":5193734},{"value":1},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6104263536},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4373551492},"far":{"value":0}}},{"id":13338087,"frames":[],"threadState":{"x":[{"value":6107131904},{"value":66979},{"value":6106595328},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6107131904},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":4373551492},"far":{"value":0}}},{"id":13338088,"frames":[],"threadState":{"x":[{"value":6107705344},{"value":0},{"value":6107168768},{"value":0},{"value":278532},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":0},"fp":{"value":0},"sp":{"value":6107705344},"esr":{"value":0},"pc":{"value":4373551492},"far":{"value":0}}}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4377149440,
    "size" : 655360,
    "uuid" : "b50f5a1a-be81-3068-92e1-3554f2be478a",
    "path" : "\/usr\/lib\/dyld",
    "name" : "dyld"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4373446656,
    "CFBundleShortVersionString" : "1.0.0",
    "CFBundleIdentifier" : "com.peacockerystudio.closeyourtab",
    "size" : 16384,
    "uuid" : "a9ee95aa-2d16-3361-be48-6f3efcd85e2d",
    "path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/13B9FB16-6113-408A-AD8A-A155750309D9\/data\/Containers\/Bundle\/Application\/A5D7C373-750A-40A4-BE87-A5FC64D28CE5\/closeyourtab.app\/closeyourtab",
    "name" : "closeyourtab",
    "CFBundleVersion" : "1"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4418977792,
    "size" : 13107200,
    "uuid" : "8cd7a582-227c-3e31-92f7-b8f6324828d5",
    "path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/13B9FB16-6113-408A-AD8A-A155750309D9\/data\/Containers\/Bundle\/Application\/A5D7C373-750A-40A4-BE87-A5FC64D28CE5\/closeyourtab.app\/closeyourtab.debug.dylib",
    "name" : "closeyourtab.debug.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4514971648,
    "CFBundleShortVersionString" : "1.0",
    "CFBundleIdentifier" : "react-native.React",
    "size" : 14761984,
    "uuid" : "ac487519-d12b-3ed8-b013-5010ec9bc032",
    "path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/13B9FB16-6113-408A-AD8A-A155750309D9\/data\/Containers\/Bundle\/Application\/A5D7C373-750A-40A4-BE87-A5FC64D28CE5\/closeyourtab.app\/Frameworks\/React.framework\/React",
    "name" : "React",
    "CFBundleVersion" : "1"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4382146560,
    "CFBundleShortVersionString" : "1.0",
    "CFBundleIdentifier" : "third-party.ReactNativeDependencies",
    "size" : 1474560,
    "uuid" : "1c45f8d4-664a-3470-8fd0-341a04b1a28c",
    "path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/13B9FB16-6113-408A-AD8A-A155750309D9\/data\/Containers\/Bundle\/Application\/A5D7C373-750A-40A4-BE87-A5FC64D28CE5\/closeyourtab.app\/Frameworks\/ReactNativeDependencies.framework\/ReactNativeDependencies",
    "name" : "ReactNativeDependencies",
    "CFBundleVersion" : "1"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4392763392,
    "CFBundleShortVersionString" : "0.12.0",
    "CFBundleIdentifier" : "dev.hermesengine.iphonesimulator",
    "size" : 3702784,
    "uuid" : "944bd49b-ad2e-3e3c-96ac-0603909fdd97",
    "path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/13B9FB16-6113-408A-AD8A-A155750309D9\/data\/Containers\/Bundle\/Application\/A5D7C373-750A-40A4-BE87-A5FC64D28CE5\/closeyourtab.app\/Frameworks\/hermes.framework\/hermes",
    "name" : "hermes",
    "CFBundleVersion" : "0.12.0"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4373954560,
    "size" : 32768,
    "uuid" : "af547fd5-445c-3167-911e-194532cf1f08",
    "path" : "\/usr\/lib\/system\/libsystem_platform.dylib",
    "name" : "libsystem_platform.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4376297472,
    "size" : 245760,
    "uuid" : "545f62d1-ac22-3ce8-a7d6-53b08a143e8e",
    "path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
    "name" : "libsystem_kernel.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4373544960,
    "size" : 65536,
    "uuid" : "24a6e967-2095-367a-a315-dcdf05eef42e",
    "path" : "\/usr\/lib\/system\/libsystem_pthread.dylib",
    "name" : "libsystem_pthread.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4377001984,
    "size" : 49152,
    "uuid" : "f766081e-2450-3187-beb3-a18b5d825986",
    "path" : "\/Volumes\/VOLUME\/_\/libobjc-trampolines.dylib",
    "name" : "libobjc-trampolines.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6443765760,
    "size" : 512708,
    "uuid" : "4be317ce-e19b-36b1-809a-b1fbf17587a8",
    "path" : "\/Volumes\/VOLUME\/_\/libsystem_c.dylib",
    "name" : "libsystem_c.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6445539328,
    "size" : 99696,
    "uuid" : "854f9986-f066-3a26-8bd7-4c14dd25f58e",
    "path" : "\/Volumes\/VOLUME\/_\/libc++abi.dylib",
    "name" : "libc++abi.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6442909696,
    "size" : 250520,
    "uuid" : "bb867be3-83c2-3d97-84ef-4661b648229c",
    "path" : "\/Volumes\/VOLUME\/_\/libobjc.A.dylib",
    "name" : "libobjc.A.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6649774080,
    "CFBundleShortVersionString" : "1193.39.9",
    "CFBundleIdentifier" : "com.apple.QuartzCore",
    "size" : 3333344,
    "uuid" : "1c6bd7be-1cbb-3828-afc8-190bdf09dfcf",
    "path" : "\/Volumes\/VOLUME\/_\/QuartzCore.framework\/QuartzCore",
    "name" : "QuartzCore",
    "CFBundleVersion" : "1193.39.9"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6527840256,
    "CFBundleShortVersionString" : "1.0",
    "CFBundleIdentifier" : "com.apple.UIKitCore",
    "size" : 35735232,
    "uuid" : "55f9ab77-06fb-3839-9083-ddbf2b2608be",
    "path" : "\/Volumes\/VOLUME\/_\/UIKitCore.framework\/UIKitCore",
    "name" : "UIKitCore",
    "CFBundleVersion" : "9126.1.12.1.112"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 9931870208,
    "CFBundleShortVersionString" : "1",
    "CFBundleIdentifier" : "com.apple.UpdateCycle",
    "size" : 7840,
    "uuid" : "2f470b4d-48c2-369f-9905-7e01b9606cc4",
    "path" : "\/Volumes\/VOLUME\/_\/UpdateCycle.framework\/UpdateCycle",
    "name" : "UpdateCycle",
    "CFBundleVersion" : "1"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6446395392,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.CoreFoundation",
    "size" : 4309888,
    "uuid" : "1ce7a90d-1134-3bfe-b564-88755edd6c85",
    "path" : "\/Volumes\/VOLUME\/_\/CoreFoundation.framework\/CoreFoundation",
    "name" : "CoreFoundation",
    "CFBundleVersion" : "4109.1.101"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6751502336,
    "CFBundleShortVersionString" : "1.0",
    "CFBundleIdentifier" : "com.apple.GraphicsServices",
    "size" : 32192,
    "uuid" : "4150c740-636d-3fba-a5f1-3e1483221156",
    "path" : "\/Volumes\/VOLUME\/_\/GraphicsServices.framework\/GraphicsServices",
    "name" : "GraphicsServices",
    "CFBundleVersion" : "1.0"
  },
  {
    "size" : 0,
    "source" : "A",
    "base" : 0,
    "uuid" : "00000000-0000-0000-0000-000000000000"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6451228672,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.Foundation",
    "size" : 13942144,
    "uuid" : "249188a3-8f44-3d76-acb0-0345a43eb0a3",
    "path" : "\/Volumes\/VOLUME\/_\/Foundation.framework\/Foundation",
    "name" : "Foundation",
    "CFBundleVersion" : "4109.1.101"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6522785792,
    "CFBundleShortVersionString" : "1.0",
    "CFBundleIdentifier" : "com.apple.CFNetwork",
    "size" : 3612992,
    "uuid" : "e8f01728-c4af-3b4f-b340-af39876bf31d",
    "path" : "\/Volumes\/VOLUME\/_\/CFNetwork.framework\/CFNetwork",
    "name" : "CFNetwork",
    "CFBundleVersion" : "3860.200.71"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6444281856,
    "size" : 283072,
    "uuid" : "da1dd2f7-9f16-387c-9c54-fe18cccb12d9",
    "path" : "\/Volumes\/VOLUME\/_\/libdispatch.dylib",
    "name" : "libdispatch.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 6445678592,
    "size" : 562400,
    "uuid" : "a7d32f85-302a-33da-a8c5-5b94a8e2c838",
    "path" : "\/Volumes\/VOLUME\/*\/libc++.1.dylib",
    "name" : "libc++.1.dylib"
  }
],
  "sharedCache" : {
  "base" : 6442450944,
  "size" : 4245422080,
  "uuid" : "0136a6b9-a945-37d6-94d1-fed0f2b3c07e"
},
  "vmSummary" : "ReadOnly portion of Libraries: Total=1.8G resident=0K(0%) swapped_out_or_unallocated=1.8G(100%)\nWritable regions: Total=1.8G written=3476K(0%) resident=2852K(0%) swapped_out=624K(0%) unallocated=1.8G(100%)\n\n                                VIRTUAL   REGION \nREGION TYPE                        SIZE    COUNT (non-coalesced) \n===========                     =======  ======= \nAccelerate framework               128K        1 \nActivity Tracing                   256K        1 \nAttributeGraph Data               1024K        1 \nCG raster data                    2880K       88 \nColorSync                           16K        1 \nCoreAnimation                     35.0M      101 \nFoundation                          16K        1 \nIOSurface                         34.4M        4 \nImage IO                          4512K        8 \nKernel Alloc Once                   32K        1 \nMALLOC                             1.6G      393 \nMALLOC guard page                  576K       36 \nSQLite page cache                  384K        3 \nSTACK GUARD                       56.3M       18 \nStack                             17.5M       18 \nVM_ALLOCATE                       75.2M     1040 \n__DATA                            46.6M      934 \n__DATA_CONST                     112.4M      961 \n__DATA_DIRTY                       139K       13 \n__FONT_DATA                        2352        1 \n__LINKEDIT                       775.7M       11 \n__OBJC_RO                         62.6M        1 \n__OBJC_RW                         2773K        1 \n__TEXT                             1.1G      975 \n__TPRO_CONST                       148K        2 \ndyld private memory                2.2G       78 \nmapped file                      254.3M       54 \npage table in kernel              2852K        1 \nshared memory                       16K        1 \n===========                     =======  ======= \nTOTAL                              6.3G     4748 \n",
  "legacyInfo" : {
  "threadTriggered" : {
    "queue" : "com.apple.main-thread"
  }
},
  "logWritingSignature" : "7774087ce948f1d1d85f4c9bc569dea51a1fdfbf",
  "trialInfo" : {
  "rollouts" : [
    {
      "rolloutId" : "642da32dea3b2418c750f848",
      "factorPackIds" : [
        "66d8b2f77cd4b62688efd2cf"
      ],
      "deploymentId" : 240000011
    },
    {
      "rolloutId" : "64628732bf2f5257dedc8988",
      "factorPackIds" : [

      ],
      "deploymentId" : 240000001
    }
  ],
  "experiments" : [

  ]
}
}

Model: Mac16,12, BootROM 13822.41.1, proc 10:4:6 processors, 16 GB, SMC
Graphics: Apple M4, Apple M4, Built-In
Display: Color LCD, 2560 x 1664 Retina, Main, MirrorOff, Online
Display: LG ULTRAGEAR, 2560 x 1440 (QHD/WQHD - Wide Quad High Definition), MirrorOff, Online
Memory Module: LPDDR5, Micron
AirPort: spairport_wireless_card_type_wifi (0x14E4, 0x4388), wl0: Oct  3 2025 00:48:50 version 23.41.7.0.41.51.200 FWID 01-8b09c4e0
IO80211_driverkit-1530.16 "IO80211_driverkit-1530.16" Oct 10 2025 22:56:35
AirPort:
Bluetooth: Version (null), 0 services, 0 devices, 0 incoming serial ports
Network Service: Wi-Fi, AirPort, en0
Network Service: Tailscale, VPN (io.tailscale.ipn.macsys), utun6
Thunderbolt Bus: MacBook Air, Apple Inc.
Thunderbolt Bus: MacBook Air, Apple Inc.
