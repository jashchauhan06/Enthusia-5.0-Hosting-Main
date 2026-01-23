"use client";

import React, { forwardRef, useState, useRef, useImperativeHandle, useMemo, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import TeamCard, { TeamModal } from '../TeamCard';
import { teamData, teamCategories } from '../../data/teamData';
import '../Team.css';

const INITIAL_DISPLAY_COUNT = 10;
const DESKTOP_PAGE_SIZE = 6; // Show 6 members per page on desktop

const Team = forwardRef((props, ref) => {
    const sectionRef = useRef(null);
    const memberRefs = useRef([]);
    const containerRef = useRef(null);
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const textRef = useRef(null);

    // Filter Logic State
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentPage, setCurrentPage] = useState(0); // Pagination state

    // Internal scroll state for expanded view
    const [internalScrollProgress, setInternalScrollProgress] = useState(0);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const [canScrollUp, setCanScrollUp] = useState(false);

    // Detect if desktop view
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use refs for scroll state to avoid stale closure issues
    const scrollStateRef = useRef({
        canScrollDown: false,
        canScrollUp: false,
        scrollProgress: 0
    });
    const showAllRef = useRef(false);

    // Keep showAllRef in sync
    useEffect(() => {
        showAllRef.current = showAll;
    }, [showAll]);

    // Filter team members based on active category
    const filteredMembers = useMemo(() => {
        if (activeFilter === 'all') {
            return teamData;
        }
        return teamData.filter(member => member.category === activeFilter);
    }, [activeFilter]);

    // Reset to first page when filtered members change
    useEffect(() => {
        setCurrentPage(0);
    }, [filteredMembers.length, activeFilter]);

    // Reset to first page when section becomes active (progress changes to 0 or 1)
    useEffect(() => {
        if (progress === 0 || progress === 1) {
            setCurrentPage(0);
        }
    }, [progress]);

    // Get members to display (limited or all)
    const displayedMembers = useMemo(() => {
        if (showAll) {
            return filteredMembers;
        }
        
        // Desktop pagination
        if (isDesktop) {
            // Ensure currentPage is within valid range
            const maxPage = Math.max(0, Math.ceil(filteredMembers.length / DESKTOP_PAGE_SIZE) - 1);
            const validPage = Math.min(Math.max(0, currentPage), maxPage);
            const startIndex = validPage * DESKTOP_PAGE_SIZE;
            const endIndex = startIndex + DESKTOP_PAGE_SIZE;
            return filteredMembers.slice(startIndex, endIndex);
        }
        
        // Mobile - show all members for scrolling
        return filteredMembers;
    }, [filteredMembers, showAll, currentPage, isDesktop]);

    // Calculate total pages for desktop
    const totalPages = Math.ceil(filteredMembers.length / DESKTOP_PAGE_SIZE);
    const canGoNext = currentPage < totalPages - 1;
    const canGoPrev = currentPage > 0;

    // Check if there are more members to show
    const hasMoreMembers = filteredMembers.length > (isDesktop ? DESKTOP_PAGE_SIZE : INITIAL_DISPLAY_COUNT);

    const maxRadius = 260;
    const currentRadius = useRef(0);

    const updateVisuals = (newProgress, immediate = false) => {
        const targetRadius = newProgress * maxRadius;

        // Classes
        if (newProgress > 0.1) {
            outerRef.current?.classList.add('active');
            innerRef.current?.classList.add('active');
        } else {
            outerRef.current?.classList.remove('active');
            innerRef.current?.classList.remove('active');
        }

        if (newProgress > 0.7) {
            textRef.current?.classList.add('visible');
        } else {
            textRef.current?.classList.remove('visible');
        }

        const duration = immediate ? 0 : 0.6;
        gsap.to(currentRadius, {
            current: targetRadius,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
                const r = currentRadius.current;
                memberRefs.current.forEach((member, i) => {
                    if (!member) return;
                    const angle = i * (Math.PI / 4); // 8 members -> 45 deg
                    const x = r * Math.cos(angle);
                    const y = r * Math.sin(angle);
                    member.style.transform = `translate(${x}px, ${y}px)`;
                });
            }
        });
    };

    // Update scroll state when expanded - using ref to avoid stale closures
    const updateScrollState = useCallback(() => {
        if (!containerRef.current || !showAllRef.current) {
            setCanScrollDown(false);
            setCanScrollUp(false);
            scrollStateRef.current = {
                canScrollDown: false,
                canScrollUp: false,
                scrollProgress: 0
            };
            return;
        }

        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const maxScroll = scrollHeight - clientHeight;

        // Using a small threshold to handle floating point issues
        const threshold = 5;

        // Can scroll down if not at bottom
        setCanScrollDown(scrollTop + clientHeight < scrollHeight - threshold);
        // Can scroll up if not at top
        setCanScrollUp(scrollTop > threshold);

        scrollStateRef.current = {
            canScrollDown: scrollTop < maxScroll - threshold,
            canScrollUp: scrollTop > threshold,
            scrollProgress: maxScroll > 0 ? scrollTop / maxScroll : 0
        };

        if (maxScroll > 0) {
            setInternalScrollProgress(scrollTop / maxScroll);
        }
    }, []);

    // Handle internal scroll when expanded
    useEffect(() => {
        if (!showAll || !containerRef.current) {
            scrollStateRef.current = {
                canScrollDown: false,
                canScrollUp: false,
                scrollProgress: 0
            };
            return;
        }

        const container = containerRef.current;

        // Initial state check after a small delay to let content render
        updateScrollState();
        setTimeout(() => updateScrollState(), 100);

        // Listen for scroll events on container
        const handleScroll = () => {
            updateScrollState();
        };
        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [showAll, updateScrollState, displayedMembers.length]);


    // Handle filter change
    const handleFilterChange = (category) => {
        setActiveFilter(category);
        setShowAll(false); // Reset to collapsed when changing filters
        setCurrentPage(0); // Reset to first page
        setInternalScrollProgress(0);
    };

    // Handle card click - open modal
    const handleCardClick = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300);
    };

    // Toggle show all/less
    const toggleShowAll = () => {
        setShowAll(prev => {
            if (!prev) {
                // Expanding - reset scroll to top
                setInternalScrollProgress(0);
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.scrollTop = 0;
                        updateScrollState();
                    }
                }, 50);
            }
            return !prev;
        });
    };

    // Pagination handlers
    const lastPaginationTime = useRef(0);
    
    const handleNextPage = (e) => {
        e?.stopPropagation(); // Prevent event bubbling
        if (canGoNext) {
            lastPaginationTime.current = Date.now();
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = (e) => {
        e?.stopPropagation(); // Prevent event bubbling
        if (canGoPrev) {
            lastPaginationTime.current = Date.now();
            setCurrentPage(prev => prev - 1);
        }
    };

    // Collapse the expanded view (close Show More)
    const collapseView = useCallback(() => {
        setShowAll(false);
        // Scroll container back to top
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, []);

    // Scroll the internal container
    const scrollInternal = useCallback((direction) => {
        if (!containerRef.current || !showAllRef.current) return false;

        const container = containerRef.current;
        const scrollAmount = 150; // pixels to scroll

        // Re-check current state
        updateScrollState();
        const { canScrollDown, canScrollUp } = scrollStateRef.current;

        if (direction === 'down' && canScrollDown) {
            container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            return true;
        } else if (direction === 'up' && canScrollUp) {
            container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            return true;
        }

        return false;
    }, [updateScrollState]);

    // Imperative handle for scroll controller
    useImperativeHandle(ref, () => ({
        next: () => {
            // Ignore scroll events shortly after pagination button click
            if (Date.now() - lastPaginationTime.current < 500) {
                return false; // Let the section transition happen
            }

            // Re-check scroll state
            updateScrollState();

            // If expanded and can scroll down, scroll internally first
            if (showAllRef.current && scrollStateRef.current.canScrollDown) {
                scrollInternal('down');
                return true; // Consumed the scroll
            }

            // Otherwise, allow section transition
            if (progress >= 1) return false;

            // Complete animation in one step
            const newP = 1;
            setProgress(newP);
            updateVisuals(newP);
            return true;
        },
        prev: () => {
            // Ignore scroll events shortly after pagination button click
            if (Date.now() - lastPaginationTime.current < 500) {
                return false; // Let the section transition happen
            }

            // Re-check scroll state
            updateScrollState();

            // If expanded and can scroll up, scroll internally first
            if (showAllRef.current && scrollStateRef.current.canScrollUp) {
                scrollInternal('up');
                return true; // Consumed the scroll
            }

            // If expanded but at the top, COLLAPSE the view instead of transitioning
            if (showAllRef.current && !scrollStateRef.current.canScrollUp) {
                collapseView();
                return true; // Consumed the scroll - collapsed the view
            }

            // Otherwise, allow section transition
            if (progress <= 0) return false;

            // Reverse animation in one step
            const newP = 0;
            setProgress(newP);
            updateVisuals(newP);
            return true;
        },
        isFinished: () => {
            updateScrollState();
            // Not finished if expanded and can still scroll down
            if (showAllRef.current && scrollStateRef.current.canScrollDown) return false;
            return progress >= 1;
        },
        isAtStart: () => {
            updateScrollState();
            // Not at start if expanded and can still scroll up
            if (showAll && canScrollUp) return false;

            // Not at start if expanded (need to collapse first)
            if (showAllRef.current) return false;

            return progress <= 0;
        },
        reset: (toStart) => {
            const newP = toStart ? 0 : 1;
            setProgress(newP);
            setShowAll(false); // Always collapse on reset
            setCurrentPage(0); // Reset pagination
            if (containerRef.current) {
                containerRef.current.scrollTop = 0;
            }
            updateVisuals(newP, true);
            updateScrollState();
        },
        type: 'TEAM',
        el: sectionRef.current
    }), [progress, scrollInternal, updateScrollState, collapseView, showAll, canScrollUp]);

    return (
        <section className="team-section section" id="team" ref={sectionRef}>
            <div className="team-container">
                <div
                    className={`team-container ${showAll ? 'team-container--expanded' : ''}`}
                    ref={containerRef}
                >
                    {/* Header */}
                    <div className="team-header">
                        <h2 className="team-title">
                            Meet <span className="gradient-text">Our Team</span>
                        </h2>
                        <p className="team-subtitle">
                            The passionate minds building the future.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="team-filters">
                        {teamCategories.map((category) => (
                            <button
                                key={category.key}
                                className={`team-filter-tab ${activeFilter === category.key ? 'active' : ''}`}
                                onClick={() => handleFilterChange(category.key)}
                                aria-pressed={activeFilter === category.key}
                            >
                                {category.label}
                                {activeFilter === category.key && (
                                    <span className="team-filter-tab__count">
                                        {category.key === 'all'
                                            ? teamData.length
                                            : teamData.filter(m => m.category === category.key).length
                                        }
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Pagination Navigation */}
                    {isDesktop && !showAll && (
                        <div className="team-pagination-wrapper" key={`pagination-${activeFilter}-${currentPage}`}>
                            <button
                                className="team-pagination-btn team-pagination-btn--prev"
                                onClick={(e) => handlePrevPage(e)}
                                disabled={!canGoPrev}
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Team Grid */}
                            <div className="team-grid" key={`grid-${activeFilter}-${currentPage}`}>
                                {displayedMembers.map((member, index) => (
                                    <div
                                        key={`${member.id}-${currentPage}`}
                                        className="team-grid__item"
                                        style={{
                                            animationDelay: `${index * 0.05}s`,
                                        }}
                                    >
                                        <TeamCard
                                            member={member}
                                            onClick={handleCardClick}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                className="team-pagination-btn team-pagination-btn--next"
                                onClick={(e) => handleNextPage(e)}
                                disabled={!canGoNext}
                                aria-label="Next page"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}

                    {/* Mobile View - No Pagination */}
                    {!isDesktop && (
                        <div className="team-grid">
                            {displayedMembers.map((member, index) => (
                                <div
                                    key={member.id}
                                    className="team-grid__item"
                                    style={{
                                        animationDelay: `${index * 0.05}s`,
                                    }}
                                >
                                    <TeamCard
                                        member={member}
                                        onClick={handleCardClick}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Page Indicator for Desktop */}
                    {isDesktop && !showAll && totalPages > 1 && (
                        <div className="team-page-indicator">
                            Page {currentPage + 1} of {totalPages}
                        </div>
                    )}
                </div>

                {/* Scroll indicator when expanded */}
                {showAll && canScrollDown && (
                    <div className="team-scroll-hint">
                        Scroll to see more ↓
                    </div>
                )}
            </div>

            {/* Modal */}
            <TeamModal
                member={selectedMember}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />

            {/* Legacy Elements for ScrollController compatibility (Hidden/Unused but kept for refs if needed) */}
            <div style={{ display: 'none' }} ref={outerRef}></div>
            <div style={{ display: 'none' }} ref={innerRef}></div>
            <div style={{ display: 'none' }} ref={textRef}></div>
        </section>
    );
});

export default Team;
